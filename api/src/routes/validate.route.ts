import { Hono } from 'hono';
import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Schema } from 'zod';
import { ValidateGarment, ValidateModel, validateGarmentSchema, validateModelSchema } from '../schemas/validate.schema';

interface Bindings {
	GOOGLE_GENERATIVE_AI_API_KEY: string;
}

type ErrorCode = 'INVALID_MODEL' | 'INVALID_GARMENT';

const app = new Hono<{ Bindings: Bindings }>();

async function validatorFactory<T>({ model, schema, system, image }: { model: any; schema: Schema<T>; system: string; image: File }) {
	return generateObject<T>({
		model,
		schema,
		system,
		messages: [
			{
				role: 'user',
				content: [{ type: 'image', image: await image.arrayBuffer() }],
			},
		],
		temperature: 0,
		maxRetries: 0,
		mode: 'json',
	});
}

app.post('/', async (c) => {
	const body = await c.req.parseBody();
	const img = { model: body['model'] as File, garment: body['garment'] as File };
	const google = createGoogleGenerativeAI({
		apiKey: c.env['GOOGLE_GENERATIVE_AI_API_KEY'],
	});
	const llm = google('models/gemini-1.5-flash-latest');
	const promises = [
		validatorFactory({
			model: llm,
			schema: validateModelSchema,
			system: `
				You validate images with HUMANS on it.
				A valid MODEL is a human that is showing their FULL UPPER-BODY.
			`.trim(),
			image: img.model,
		}),
		validatorFactory({
			model: llm,
			schema: validateGarmentSchema,
			system: `
				You validate images with REAL UPPER-BODY garment on it.
				A valid garment image CAN'T have HUMAN wearing the garment.
			`.trim(),
			image: img.garment,
		}),
	];
	const [model, garment] = await Promise.allSettled(promises);
	const errors: { message: string; code: ErrorCode }[] = [];

	if (model.status === 'rejected' || garment.status === 'rejected')
		return c.json({ errors: [{ message: 'Something went wrong', code: 'SERVER_ERROR' }] }, 500);

	const res = { ...model.value.object, ...garment.value.object } as ValidateGarment & ValidateModel;

	if (!res?.isHuman) errors.push({ message: 'Model must be an human', code: 'INVALID_MODEL' });
	if (!res?.isShowingUpperBody) errors.push({ message: 'Model must show at least their upper-body', code: 'INVALID_MODEL' });
	if (!res?.isCloth) errors.push({ message: 'Image must be a valid cloth', code: 'INVALID_GARMENT' });
	if (!res?.isUpperBody) errors.push({ message: 'Garment must be upper-body', code: 'INVALID_GARMENT' });
	if (res?.hasHuman) errors.push({ message: 'Garment image must not have a model', code: 'INVALID_GARMENT' });

	if (errors.length >= 1) return c.json({ errors }, 400);

	return c.json({ data: res });
});

export default app;
