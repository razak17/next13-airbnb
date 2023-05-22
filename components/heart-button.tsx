'use client';

import { AuthenticatedUser } from '@/types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavoriteListing from '@/hooks/use-favorite-listings';

interface HeartButtonProps {
	listingId: string;
	currentUser?: AuthenticatedUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
	const { isFavorite, toggleIsFavorite } = useFavoriteListing({
		listingId,
		currentUser,
	});

	return (
		<div
			onClick={toggleIsFavorite}
			className='
        relative
        cursor-pointer
        transition
        hover:opacity-80
      '
		>
			<AiOutlineHeart
				size={28}
				className='
          absolute
          right-[-2px]
          top-[-2px]
          fill-white
        '
			/>
			<AiFillHeart
				size={24}
				className={isFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
			/>
		</div>
	);
};

export default HeartButton;
