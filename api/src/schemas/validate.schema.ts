import { z } from 'zod';

export const validateModelSchema = z.object({
	isHuman: z.boolean(),
	isShowingUpperBody: z.boolean().describe('boolean that indicates if the human on the image is showing their upper-body'),
});
