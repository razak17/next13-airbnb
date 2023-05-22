import * as z from 'zod';

import { db } from './db';

const getReservationsParams = z.object({
	listingId: z.string().optional(),
	userId: z.string().optional(),
	authorId: z.string().optional(),
});

export async function getReservations(
	params: z.infer<typeof getReservationsParams>
) {
	try {
		const { listingId, userId, authorId } = params;

		const query: Pick<
			z.infer<typeof getReservationsParams>,
			'listingId' | 'userId'
		> & {
			listing?: {
				userId?: string;
			};
		} = {};

		if (listingId) {
			query.listingId = listingId;
		}

		if (userId) {
			query.userId = userId;
		}

		if (authorId) {
			query.listing = { userId: authorId };
		}

		const reservations = await db.reservation.findMany({
			where: query,
			include: {
				listing: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const formattedReservations = reservations.map((reservation) => ({
			...reservation,
			createdAt: reservation.createdAt.toISOString(),
			startDate: reservation.startDate.toISOString(),
			endDate: reservation.endDate.toISOString(),
			listing: {
				...reservation.listing,
				createdAt: reservation.listing.createdAt.toISOString(),
			},
		}));

		return formattedReservations;
	} catch (error) {
		throw new Error(error as string);
	}
}
