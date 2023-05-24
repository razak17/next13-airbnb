import * as z from 'zod';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

const createReservationSchema = z.object({
	listingId: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	totalPrice: z.number(),
});

export async function POST(request: Request) {
	try {
		const json = await request.json();
		const body = createReservationSchema.parse(json);

		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return new Response('Unauthorized', { status: 403 });
		}

		const listingAndReservation = await db.listing.update({
			where: {
				id: body.listingId,
			},
			data: {
				reservations: {
					create: {
						userId: currentUser.id,
						startDate: body.startDate,
						endDate: body.endDate,
						totalPrice: body.totalPrice,
					},
				},
			},
		});

		return new Response(JSON.stringify(listingAndReservation));
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response('Something went wrong', { status: 500 });
	}
}
