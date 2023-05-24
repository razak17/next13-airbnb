import { getReservations } from '@/lib/reservation';
import { getCurrentUser } from '@/lib/session';
import UseClient from '@/hooks/use-client';
import Wrapper from '@/components/ui/wrapper';
import {
	EmptyPlaceholder,
	EmptyPlaceholderButton,
	EmptyPlaceholderDescription,
	EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';
import TripItem from '@/components/trip-item';

const TripsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<Wrapper>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>Unauthorized</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						You are not authorized to view this page. Please login.
					</EmptyPlaceholderDescription>
					<EmptyPlaceholderButton label='Go to login page' redirect='/login' />
				</EmptyPlaceholder>
			</Wrapper>
		);
	}

	const reservations = await getReservations({ userId: currentUser.id });

	if (reservations.length === 0) {
		return (
			<UseClient>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>No trips found</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						Looks like you haven&apos;t reserved any trips yet.
					</EmptyPlaceholderDescription>
					<EmptyPlaceholderButton label='See available listings' />
				</EmptyPlaceholder>
			</UseClient>
		);
	}

	return (
		<UseClient>
			<TripItem reservations={reservations} currentUser={currentUser} />
		</UseClient>
	);
};

export default TripsPage;
