import { z } from 'zod';

export const validateSchema = z.object({
	isHuman: z.boolean(),
});
