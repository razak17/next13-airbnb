import { getServerSession } from 'next-auth/next';

import { authOptions } from './auth';
import { db } from './db';

export async function getCurrentUser() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return null;
	}

	const currentUser = await db.user.findUnique({
		where: {
			email: session.user.email as string,
		},
	});

	if (!currentUser) {
		return null;
	}

	return {
		...currentUser,
		createdAt: currentUser.createdAt.toISOString(),
		updatedAt: currentUser.updatedAt.toISOString(),
		emailVerified: currentUser.emailVerified?.toISOString() || null,
	};
}
