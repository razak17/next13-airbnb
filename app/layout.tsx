import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import WithClient from './utils/WithClient';

import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/loginModal';

import './globals.css';
export const metadata = {
	title: 'Next Airbnb',
	description: 'NextJS Airbnb clone'
};

const font = Nunito({
	subsets: ['latin']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<WithClient>
					<Navbar />
          <LoginModal />
          <RegisterModal />
				</WithClient>
				{children}
			</body>
		</html>
	);
}
