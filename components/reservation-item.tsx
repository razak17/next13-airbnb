'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticatedUser, ListingResevation } from '@/types';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import ListingCard from './listing-card';
import Heading from './ui/heading';
import Wrapper from './ui/wrapper';

interface ReservationsClientProps {
	reservations: ListingResevation[];
	currentUser?: AuthenticatedUser | null;
}

const ReservationsItem = ({
	reservations,
	currentUser,
}: ReservationsClientProps) => {
	const router = useRouter();
	const [targetReservationId, setTargetReservationId] = useState('');

	const onCancel = useCallback(
		(reservationId: string) => {
			setTargetReservationId(reservationId);

			axios
				.delete(`/api/reservations/${reservationId}`)
				.then(() => {
					toast.success('Reservation cancelled');
					router.refresh();
				})
				.catch((error) => {
					toast.error('Something went wrong.');
				})
				.finally(() => {
					setTargetReservationId('');
				});
		},
		[router]
	);

	return (
		<Wrapper>
			<Heading title='Reservations' subtitle='Bookings on your properties' />
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
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={targetReservationId === reservation.id}
						actionLabel='Cancel guest reservation'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Wrapper>
	);
};

export default ReservationsItem;
