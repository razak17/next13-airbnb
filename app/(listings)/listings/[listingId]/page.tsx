import { getListingById } from '@/lib/listing';
import { getCurrentUser } from '@/lib/session';
import UseClient from '@/hooks/use-client';
import {
	EmptyPlaceholder,
	EmptyPlaceholderButton,
	EmptyPlaceholderDescription,
	EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';
import ListingItem from '@/components/listing-item';

interface ListingPageProps {
	params: {
		listingId: string;
	};
}

const ListingPage = async ({ params }: ListingPageProps) => {
	const currentUser = await getCurrentUser();
	const listing = await getListingById(params);

	if (!listing) {
		return (
			<UseClient>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>Listing Not Found</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						We couldn&apos;t find the listing you were looking for.
					</EmptyPlaceholderDescription>
					<EmptyPlaceholderButton label='Go to home' resetFilter />
				</EmptyPlaceholder>
			</UseClient>
		);
	}

	return (
		<UseClient>
			<ListingItem listing={listing} currentUser={currentUser} />
		</UseClient>
	);
};

export default ListingPage;
