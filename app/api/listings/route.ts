import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { listingFormSchema } from '@/lib/validations/listing';

export async function POST(req: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return new Response(null, { status: 403 });
	}

	const json = await req.json();
	const body = listingFormSchema.parse(json);

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
}
