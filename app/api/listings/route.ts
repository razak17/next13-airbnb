import * as z from 'zod';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { listingFormSchema } from '@/lib/validations/listing';

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const body = listingFormSchema.parse(json);

		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return new Response('Unauthorized', { status: 403 });
		}

		const listing = await db.listing.create({
			data: {
				title: body.title,
				description: body.description,
				imageSrc: body.imageSrc,
				category: body.category,
				roomCount: body.roomCount,
				bathroomCount: body.bathroomCount,
				guestCount: body.guestCount,
				locationValue: body.location?.value as string,
				price: parseInt(body.price, 10),
				userId: currentUser.id,
			},
		});

		return new Response(JSON.stringify(listing));
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response('Something went wrong', { status: 500 });
	}
}
