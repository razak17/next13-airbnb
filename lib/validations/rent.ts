import * as z from 'zod';
import { CATEGORIES } from '@/types';

export const rentFormSchema = z.object({
	category: z.enum(CATEGORIES),
	location: z.array(z.string()).nullable(),
	guestCount: z.number(),
	roomCount: z.number(),
	bathroomCount: z.number(),
	imageSrc: z.string(),
	price: z.number(),
	title: z.string(),
	description: z.string(),
});
