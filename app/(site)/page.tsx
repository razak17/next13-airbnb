import { getCurrentUser } from '@/lib/session';
import UseClient from '@/hooks/use-client';
import Wrapper from '@/components/ui/wrapper';
import {
	EmptyPlaceholder,
	EmptyPlaceholderButton,
	EmptyPlaceholderDescription,
	EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';
import ListingCard from '@/components/listing-card';
import { getListings } from '@/lib/listing';

export default async function Home() {
	const listings = await getListings();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<UseClient>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>No matches found</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						There are no listings that match your search criteria. Try removing
						some filters.
					</EmptyPlaceholderDescription>
					<EmptyPlaceholderButton label='Remove all filters' resetFilter />
				</EmptyPlaceholder>
			</UseClient>
		);
	}

	return (
		<UseClient>
			<Wrapper>
				<div
					className='
            grid
            grid-cols-1 
            gap-8 
            pt-24 
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
		</UseClient>
	);
}
