import { db } from '@/lib/db';

export default async function getListings() {
	try {
		const listings = await db.listing.findMany({
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
