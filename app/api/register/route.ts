import argon2 from 'argon2';
import * as z from 'zod';

import { db } from '@/lib/db';
import { registerFormSchema } from '@/lib/validations/auth';

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const body = registerFormSchema.parse(json);

		const hashedPassword = await argon2.hash(body.password);

		const user = await db.user.create({
			data: {
				email: body.email,
				name: body.name,
				hashedPassword,
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
