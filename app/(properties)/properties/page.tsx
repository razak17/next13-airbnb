import { getListings } from '@/lib/listing';
import { getCurrentUser } from '@/lib/session';
import UseClient from '@/hooks/use-client';
import Wrapper from '@/components/ui/wrapper';
import {
	EmptyPlaceholder,
	EmptyPlaceholderButton,
	EmptyPlaceholderDescription,
	EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';
import PropertyItem from '@/components/property-item';

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<Wrapper>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>Unauthorized</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						You are not authorized to view this page. Please login.
					</EmptyPlaceholderDescription>
					<EmptyPlaceholderButton label='Go to home page' />
				</EmptyPlaceholder>
			</Wrapper>
		);
	}

	const listings = await getListings({ userId: currentUser.id });

	if (listings.length === 0) {
		return (
			<UseClient>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>No properties found</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						Looks like you don&apos;t have any properties yet.
					</EmptyPlaceholderDescription>
					<EmptyPlaceholderButton label='See available listings' />
				</EmptyPlaceholder>
			</UseClient>
		);
	}

	return (
		<UseClient>
			<PropertyItem listings={listings} currentUser={currentUser} />
		</UseClient>
	);
};

export default PropertiesPage;
