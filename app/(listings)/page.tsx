import { GetListingsParams, getListings } from '@/lib/listing';
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

interface HomeProps {
	searchParams: GetListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
	const listings = await getListings(searchParams);
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
					<EmptyPlaceholderButton label='Remove all filters' />
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
