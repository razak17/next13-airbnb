import { getFavoriteListings } from '@/lib/listing';
import { getCurrentUser } from '@/lib/session';
import UseClient from '@/hooks/use-client';
import {
	EmptyPlaceholder,
	EmptyPlaceholderDescription,
	EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';
import FavoriteItem from '@/components/favorite-item';

const ListingPage = async () => {
	const currentUser = await getCurrentUser();
	const listings = await getFavoriteListings();

	if (listings.length === 0) {
		return (
			<UseClient>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>No favorites found</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						Looks like you have no favorite listings.
					</EmptyPlaceholderDescription>
				</EmptyPlaceholder>
			</UseClient>
		);
	}

	return (
		<UseClient>
			<FavoriteItem listings={listings} currentUser={currentUser} />
		</UseClient>
	);
};

export default ListingPage;
