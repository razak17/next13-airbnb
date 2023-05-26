import { CATEGORY, Category } from '@/types';
import * as z from 'zod';

import { db } from '@/lib/db';

import { getCurrentUser } from './session';
import { toTitleCase } from './utils';

const count = z
	.object({
		gte: z.number().optional(),
	})
	.optional();

const getListingsSchema = z.object({
	userId: z.string().optional(),
	locationValue: z.string().optional(),
	category: z.enum(CATEGORY),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	guestCount: count,
	roomCount: count,
	bathroomCount: count,
	NOT: z
		.object({
			reservations: z.object({
				some: z.object({
					OR: z.array(
						z.object({
							endDate: z.object({ gte: z.string().optional() }).optional(),
							startDate: z.object({ lte: z.string().optional() }).optional(),
						})
					),
				}),
			}),
		})
		.optional(),
});

export type GetListingsParams = z.infer<typeof getListingsSchema>;

export async function getListings(params: GetListingsParams) {
	try {
		const {
			userId,
			roomCount,
			guestCount,
			bathroomCount,
			locationValue,
			startDate,
			endDate,
			category,
		} = params;

		const query: Partial<GetListingsParams> = {};

		if (userId) {
			query.userId = userId;
		}
		if (userId) {
			query.userId = userId;
		}

		if (category) {
			query.category = toTitleCase(category) as Category;
		}

		if (roomCount) {
			query.roomCount = {
				gte: +roomCount,
			};
		}

		if (guestCount) {
			query.guestCount = {
				gte: +guestCount,
			};
		}

		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount,
			};
		}

		if (locationValue) {
			query.locationValue = locationValue;
		}

		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: { gte: startDate },
								startDate: { lte: startDate },
							},
							{
								startDate: { lte: endDate },
								endDate: { gte: endDate },
							},
						],
					},
				},
			};
		}

		const listings = await db.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		});

		return listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));
	} catch (error) {
		throw new Error(error as string);
	}
}

const getListingByIdSchema = z.object({
	listingId: z.string(),
});

export async function getListingById(
	params: z.infer<typeof getListingByIdSchema>
) {
	try {
		const { listingId } = params;

		const listing = await db.listing.findUnique({
			where: {
				id: listingId,
			},
			include: {
				user: true,
			},
		});

		if (!listing) {
			return null;
		}

		return {
			...listing,
			createdAt: listing.createdAt.toString(),
			user: {
				...listing.user,
				createdAt: listing.user.createdAt.toString(),
				updatedAt: listing.user.updatedAt.toString(),
				emailVerified: listing.user.emailVerified?.toString() || null,
			},
		};
	} catch (error) {
		throw new Error(error as string);
	}
}

export async function getFavoriteListings() {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return [];
		}

		const favorites = await db.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.favoriteIds || [])],
				},
			},
		});

		const formattedFavorites = favorites.map((favorite) => ({
			...favorite,
			createdAt: favorite.createdAt.toString(),
		}));

		return formattedFavorites;
	} catch (error) {
		throw new Error(error as string);
	}
}
