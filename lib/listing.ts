import * as z from 'zod';

import { db } from '@/lib/db';

import { getCurrentUser } from './session';

const getListingsSchema = z.object({
	userId: z.string().optional(),
});

export type GetListingsParams = z.infer<typeof getListingsSchema>;

export async function getListings(params: GetListingsParams) {
	try {
		const { userId } = params;

		const query: Partial<GetListingsParams> = {};

		if (userId) {
			query.userId = userId;
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
