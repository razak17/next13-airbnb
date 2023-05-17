'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticatedUser } from '@/types';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';

import useLoginModal from '@/hooks/use-login-modal';
import useRegisterModal from '@/hooks/use-register-modal';
import useRentModal from '@/hooks/use-rent-modal';

import Avatar from './ui/avatar';
import { MenuItem } from './ui/menubar';

interface UserMenuProps {
	currentUser?: AuthenticatedUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		rentModal.onOpen();
	}, [loginModal, rentModal, currentUser]);

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div
					onClick={onRent}
					className='
            hidden
            cursor-pointer
            rounded-full
            px-4
            py-3
            text-sm
            font-semibold
            transition
            hover:bg-neutral-100
            md:block
          '
				>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className='
          flex
          cursor-pointer
          flex-row
          items-center
          gap-3
          rounded-full
          border-[1px]
          border-neutral-200
          p-4
          transition
          hover:shadow-md
          md:px-2
          md:py-1
          '
				>
					<AiOutlineMenu />
					<div className='hidden md:block'>
						<Avatar src={currentUser?.image as string} />
					</div>
				</div>
			</div>

			{isOpen && (
				<div
					className='
            absolute
            right-0
            top-12
            w-[40vw]
            overflow-hidden
            rounded-xl
            bg-white
            text-sm
            shadow-md
            md:w-3/4
          '
				>
					<div className='flex cursor-pointer flex-col'>
						{currentUser ? (
							<>
								<MenuItem
									label='My trips'
									onClick={() => router.push('/trips')}
								/>
								<MenuItem
									label='My favorites'
									onClick={() => router.push('/favorites')}
								/>
								<MenuItem
									label='My reservations'
									onClick={() => router.push('/reservations')}
								/>
								<MenuItem
									label='My properties'
									onClick={() => router.push('/properties')}
								/>
								<MenuItem label='Airbnb your home' onClick={rentModal.onOpen} />
								<hr />
								<MenuItem label='Logout' onClick={() => signOut()} />
							</>
						) : (
							<>
								<MenuItem label='Login' onClick={loginModal.onOpen} />
								<MenuItem label='Sign up' onClick={registerModal.onOpen} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
