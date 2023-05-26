import { Listing, Reservation, User } from '@prisma/client';
import { IconType } from 'react-icons';

export type AuthenticatedUser = Omit<
	User,
	'createdAt' | 'updatedAt' | 'emailVerified'
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
};

export const CATEGORY = [
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

export type Category = (typeof CATEGORY)[number];

export type CategoryItem = {
	label: Category;
	icon: IconType;
	description: string;
};

export type RentListing = Omit<Listing, 'createdAt'> & {
	createdAt: string;
};

export type ListingResevation = Omit<
	Reservation,
	'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
	createdAt: string;
	startDate: string;
	endDate: string;
	listing: RentListing;
};

export type SearchQuery = {
	locationValue: string;
	category?: Category;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	startDate?: string;
	endDate?: string;
};
