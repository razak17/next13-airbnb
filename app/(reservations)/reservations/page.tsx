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
import ReservationItem from '@/components/reservation-item';

const ReservationsPage = async () => {
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

	const reservations = await getReservations({ authorId: currentUser.id });

	if (reservations.length === 0) {
		return (
			<UseClient>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>No reservations found</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						Looks like you have no reservations on your properties yet.
					</EmptyPlaceholderDescription>
				</EmptyPlaceholder>
			</UseClient>
		);
	}

	return (
		<UseClient>
			<ReservationItem reservations={reservations} currentUser={currentUser} />
		</UseClient>
	);
};

export default ReservationsPage;
