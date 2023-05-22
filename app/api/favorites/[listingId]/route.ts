import * as z from 'zod';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

const favoriteListingSchema = z.object({
	params: z.object({
		listingId: z.string(),
	}),
});

export async function POST(
	req: Request,
	context: z.infer<typeof favoriteListingSchema>
) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return new Response('Unauthorized', { status: 403 });
		}

		const { params } = favoriteListingSchema.parse(context);

		const favoriteIds = [...(currentUser.favoriteIds || [])];

		favoriteIds.push(params.listingId);

		const user = await db.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				favoriteIds,
			},
		});

		return new Response(JSON.stringify(user));
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response('Something went wrong', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	context: z.infer<typeof favoriteListingSchema>
) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return new Response('Unauthorized', { status: 403 });
		}

		const { params } = favoriteListingSchema.parse(context);

		let favoriteIds = [...(currentUser.favoriteIds || [])];

		favoriteIds = favoriteIds.filter((id) => id !== params.listingId);

		await db.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				favoriteIds,
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
