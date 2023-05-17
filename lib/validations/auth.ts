import { CATEGORIES } from '@/types';
import * as z from 'zod';

export const registerFormSchema = z.object({
	name: z.string().min(3).max(32),
	email: z.string().email(),
	password: z.string().min(8),
});

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

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
