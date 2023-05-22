import { db } from '@/lib/db';
import * as z from 'zod';


const routeContextSchema = z.object({
	params: z.object({
		listingId: z.string(),
	}),
});

export async function getListings() {
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

export async function getListingById(
  params: z.infer<typeof routeContextSchema>['params']
) {
  try {
    const { listingId } = params;

    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true
      }
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
        emailVerified: 
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error) {
    throw new Error(error as string);
  }
}
