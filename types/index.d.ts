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
export const CATEGORIES = [
	'Beach',
	'Windmills',
	'Modern',
	'Countryside',
	'Pools',
	'Islands',
	'Lake',
	'Skiing',
	'Castles',
	'Caves',
	'Camping',
	'Arctic',
	'Desert',
	'Barns',
	'Lux',
] as const;

export type Category = (typeof CATEGORIES)[number];

export type CategoryIten = {
	label: Category;
	icon: IconType;
	description: string;
};
