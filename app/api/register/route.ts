import { NextResponse } from 'next/server';
import argon2 from 'argon2';
import { z } from 'zod';

import { db } from '@/lib/db';

const registerSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string().min(8),
});

export async function POST(req: Request) {
	const json = await req.json();
	const body = registerSchema.parse(json);

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
