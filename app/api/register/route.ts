import { NextResponse } from 'next/server';
import argon2 from 'argon2';

import { db } from '@/lib/db';
import { registerFormSchema } from '@/lib/validations/auth';

export async function POST(req: Request) {
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

	return NextResponse.json(user);
}
