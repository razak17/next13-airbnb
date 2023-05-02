import { User } from '@prisma/client';
import * as z from 'zod';

export const userSchema = z.object({
	createdAt: z.string(),
	updatedAt: z.string(),
	emailVerified: z.string().nullable(),
});

export type AuthenticatedUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> &
	z.TypeOf<typeof userSchema>;
