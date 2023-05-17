import { User } from '@prisma/client';
import { IconType } from 'react-icons';

export type AuthenticatedUser = Omit<
	User,
	'createdAt' | 'updatedAt' | 'emailVerified'
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
};

export type CategoryIten = {
	label: string;
	icon: IconType;
	description: string;
};
