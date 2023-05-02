import { AuthenticatedUser } from '@/lib/validations/user';

import Search from './search';
import Logo from './ui/logo';
import Wrapper from './ui/wrapper';
import UserMenu from './user-menu';

interface NavbarProps {
	currentUser?: AuthenticatedUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
	return (
		<div className='fixed z-10 w-full bg-white shadow-sm'>
			<div
				className='
        border-b-[1px]
        py-4
        '
			>
				<Wrapper>
					<div
						className='
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          '
					>
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Wrapper>
			</div>
		</div>
	);
};

export default Navbar;
