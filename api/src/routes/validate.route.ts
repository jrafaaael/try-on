import { Hono } from 'hono';
import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { validateSchema } from '../schemas/validate.schema';

const app = new Hono();

app.post('/', async (c) => {
	const body = await c.req.parseBody();
	const model = body['model'] as File;
	const google = createGoogleGenerativeAI({
		apiKey: c.env['GOOGLE_GENERATIVE_AI_API_KEY'],
	});

	try {
		const { object } = await generateObject({
			model: google('models/gemini-1.5-flash-latest'),
			schema: validateSchema,
			system: `
				You validate images with HUMANS on it.
				You validate if HUMANS are showing their UPPER-BODY.
			`.trim(),
			messages: [
				{
					role: 'user',
					content: [{ type: 'image', image: await model.arrayBuffer() }],
				},
			],
			temperature: 0,
			maxRetries: 0,
			mode: 'tool',
		});

		if (!object.isHuman) return c.json({ errors: [{ message: 'Model should be an human' }] }, 400);
		if (!object.isShowingUpperBody) return c.json({ errors: [{ message: 'Model should show at least their upper-body' }] }, 400);

		return c.json({ data: object }, 200);
	} catch (error) {
		console.log(error);

		return c.json({ errors: [{ message: 'Something went wrong' }] }, 500);
	}
});

export default app;
