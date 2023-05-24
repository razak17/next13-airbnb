import { AuthenticatedUser, RentListing } from '@/types';

import ListingCard from './listing-card';
import Heading from './ui/heading';
import Wrapper from './ui/wrapper';

interface FavoritesClientProps {
	listings: RentListing[];
	currentUser?: AuthenticatedUser | null;
}

const FavoriteItem = ({ listings, currentUser }: FavoritesClientProps) => {
	return (
		<Wrapper>
			<Heading title='Favorites' subtitle='List of places you favorited!' />
			<div
				className='
          mt-10
          grid 
          grid-cols-1 
          gap-8 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        '
			>
				{listings.map((listing) => (
					<ListingCard
						currentUser={currentUser}
						key={listing.id}
						data={listing}
					/>
				))}
			</div>
		</Wrapper>
	);
};

export default FavoriteItem;
