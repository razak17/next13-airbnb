import * as React from 'react';
import { Nunito } from 'next/font/google';
import ToastProvider from '@/providers/toast-provider';

import { getCurrentUser } from '@/lib/session';
import UseClient from '@/hooks/use-client';
import LoginModal from '@/components/login-modal';
import Navbar from '@/components/nav';
import RegisterModal from '@/components/register-modal';

import '@/styles/globals.css';

export const metadata = {
	title: 'Next Airbnb',
	description: 'NextJS Airbnb clone',
	icons: {
		icon: '/favicon.ico',
	},
};

const font = Nunito({
	subsets: ['latin'],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<body className={font.className}>
				<UseClient>
					<ToastProvider />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</UseClient>
				<div className='pb-20 pt-28'>{children}</div>
			</body>
		</html>
	);
}
