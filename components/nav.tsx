import Search from './search';
import Logo from './ui/logo';
import Wrapper from './ui/wrapper';
import UserMenu from './user-menu';

const Navbar = () => {
	return (
		<div className='fixed w-full bg-white z-10 shadow-sm'>
			<div
				className='
        py-4
        border-b-[1px]
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
						<UserMenu />
					</div>
				</Wrapper>
			</div>
		</div>
	);
};

export default Navbar;
