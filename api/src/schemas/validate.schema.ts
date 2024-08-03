import { z } from 'zod';

export const validateModelSchema = z.object({
	isHuman: z.boolean().describe('boolean that indicates if the model is a human'),
	isShowingUpperBody: z
		.boolean()
		.describe(
			'boolean that indicates if the human on the image is showing their full upper-body. LOWER-BODY ONLY IS NOT VALID. HALF UPPER-BODY IS NOT VALID'
		),
});

export const validateGarmentSchema = z.object({
	isCloth: z.boolean().describe('boolean that indicates if the image has a valid garment'),
	isUpperBody: z.boolean().describe('boolean that indicates if the garment is upper-body garment'),
	hasHuman: z.boolean().describe('boolean that indicates if image has a model wearing the garment'),
});
