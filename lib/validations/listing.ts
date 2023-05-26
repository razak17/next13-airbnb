import { CATEGORY } from '@/types';
import * as z from 'zod';

const locationSchema = z.object({
	flag: z.string(),
	label: z.string(),
	latlng: z.array(z.number()),
	region: z.string(),
	value: z.string(),
});

export const listingFormSchema = z.object({
	category: z.enum(CATEGORY),
	location: locationSchema.nullish(),
	guestCount: z.number().min(1).max(10),
	roomCount: z.number().min(1).max(10),
	bathroomCount: z.number().min(1).max(10),
	imageSrc: z.string(),
	price: z.string(),
	title: z.string().min(5).max(50),
	description: z.string().min(10).max(200),
});

export type Country = z.infer<typeof locationSchema>;
