import * as z from 'zod';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

const deleteListingSchema = z.object({
	params: z.object({
		listingId: z.string(),
	}),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof deleteListingSchema>
) {
	try {
		// Validate the route params.
		const { params } = deleteListingSchema.parse(context);

		// Check if the user has access to this listing.
		if (!(await verifyCurrentUserHasAccessToListing(params.listingId))) {
			return new Response('Unauthorized', { status: 403 });
		}

		// Delete the listing.
		await db.listing.delete({
			where: {
				id: params.listingId,
			},
		});

		return new Response(null, { status: 204 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response('Something went wrong', { status: 500 });
	}
}

async function verifyCurrentUserHasAccessToListing(listingId: string) {
	const currentUser = await getCurrentUser();
	const count = await db.listing.count({
		where: {
			id: listingId,
			userId: currentUser?.id,
		},
	});

	return count > 0;
}
