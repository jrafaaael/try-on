import { z } from 'zod';

export const validateModelSchema = z.object({
	isHuman: z.boolean(),
	isShowingUpperBody: z.boolean().describe('boolean that indicates if the human on the image is showing their upper-body'),
});

export const validateGarmentSchema = z.object({
	isCloth: z.boolean().describe('boolean that indicates if the image has a valid garment'),
	isUpperBody: z.boolean().describe('boolean that indicates if the garment is upper-body garment'),
	hasHuman: z.boolean().describe('booleant that indicates if image has a model wearing the garment'),
});
