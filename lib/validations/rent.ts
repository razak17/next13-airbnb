import { CATEGORIES } from '@/types';
import * as z from 'zod';

export const locationSchema = z
	.object({
		flag: z.string(),
		label: z.string(),
		latlng: z.array(z.number()),
		region: z.string(),
		value: z.string(),
	})
	.nullish();

export const rentFormSchema = z.object({
	category: z.enum(CATEGORIES),
	location: locationSchema,
	guestCount: z.number().min(1).max(10),
	roomCount: z.number().min(1).max(10),
	bathroomCount: z.number().min(1).max(10),
	imageSrc: z.string(),
	price: z.number().min(1).max(1000000),
	title: z.string().min(5).max(50),
	description: z.string().min(10).max(200),
});

export type Country = z.infer<typeof locationSchema>;
