import { Nunito } from 'next/font/google';

import LoginModal from '@/components/login-modal';
import Navbar from '@/components/nav';
import RegisterModal from '@/components/register-modal';
import ToastProvider from '@/providers/toast-provider';
import WithClient from '@/utils/with-client';
import '@/styles/globals.css';

export const metadata = {
	title: 'Next Airbnb',
	description: 'NextJS Airbnb clone',
	icons: {
		icon: '/favicon.ico'
	}
};

const font = Nunito({
	subsets: ['latin']
});

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<WithClient>
					<ToastProvider />
					<Navbar />
					<LoginModal />
					<RegisterModal />
				</WithClient>
				{children}
			</body>
		</html>
	);
}
