import { CATEGORIES } from '@/types';
import * as z from 'zod';

export const locationSchema = z.object({
	flag: z.string(),
	label: z.string(),
	latlng: z.array(z.number()),
	region: z.string(),
	value: z.string(),
}).nullish();

export const rentFormSchema = z.object({
	category: z.enum(CATEGORIES),
	location: locationSchema,
	guestCount: z.number(),
	roomCount: z.number(),
	bathroomCount: z.number(),
	imageSrc: z.string(),
	price: z.number(),
	title: z.string(),
	description: z.string(),
});

export type Country = z.infer<typeof locationSchema>;
