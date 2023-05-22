import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticatedUser } from '@/types';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useLoginModal from './use-login-modal';

interface UseFavoriteListings {
	listingId: string;
	currentUser?: AuthenticatedUser | null;
}

const useFavoriteListing = ({
	listingId,
	currentUser,
}: UseFavoriteListings) => {
	const router = useRouter();

	const loginModal = useLoginModal();

	const isFavorite = useMemo(() => {
		const favoritesList = currentUser?.favoriteIds || [];

		return favoritesList.includes(listingId);
	}, [currentUser, listingId]);

	const toggleIsFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;

				if (isFavorite) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
				}

				await request();
				router.refresh();
				toast.success('Success');
			} catch (error) {
				toast.error('Something went wrong.');
			}
		},
		[currentUser, isFavorite, listingId, loginModal, router]
	);

	return {
		isFavorite,
		toggleIsFavorite,
	};
};

export default useFavoriteListing;
