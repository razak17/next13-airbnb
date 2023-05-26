import * as z from 'zod';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

const deleteReservationSchema = z.object({
	params: z.object({
		reservationId: z.string(),
	}),
});

export async function DELETE(
	req: Request,
	context: z.infer<typeof deleteReservationSchema>
) {
	try {
		const { params } = deleteReservationSchema.parse(context);

		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return new Response('Unauthorized', { status: 403 });
		}

		const { reservationId } = params;

		// Check if the user has access to this reservation
		// if (!(await verifyCurrentUserHasAccessToReservation(reservationId))) {
		// 	return new Response('Unauthorized', { status: 403 });
		// }

		// Delete the reservation
		// await db.reservation.delete({
		// 	where: {
		// 		id: reservationId,
		// 	},
		// });

		await db.reservation.deleteMany({
			where: {
				id: reservationId,
				OR: [
					{ userId: currentUser.id },
					{ listing: { userId: currentUser.id } },
				],
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

// async function verifyCurrentUserHasAccessToReservation(reservationId: string) {
// 	const currentUser = await getCurrentUser();
// 	const count = await db.reservation.count({
// 		where: {
// 			id: reservationId,
//       OR: [
//         { userId: currentUser.id },
//         // Allow listing owner to delete reservations
//         { listing: { userId: currentUser.id } },
//       ],
// 		},
// 	});
//
// 	return count > 0;
// }
