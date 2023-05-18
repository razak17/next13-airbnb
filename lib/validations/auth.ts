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
