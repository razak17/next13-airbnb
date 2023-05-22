'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticatedUser, ListingResevation, RentListing } from '@/types';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

import { categories } from '@/config/categories';
import useLoginModal from '@/hooks/use-login-modal';

import ListingHeading from './listing-heading';
import ListingInfo from './listing-info';
import ListingReservation from './listing-reservation';
import Wrapper from './ui/wrapper';

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection',
};

interface ListingItemProps {
	reservations?: ListingResevation[];
	listing: RentListing & {
		user: AuthenticatedUser;
	};
	currentUser?: AuthenticatedUser | null;
}

const ListingItem = ({
	listing,
	reservations = [],
	currentUser,
}: ListingItemProps) => {
	const loginModal = useLoginModal();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const category = useMemo(() => {
		return categories.find((items) => items.label === listing.category);
	}, [listing.category]);

	const unavailableDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		setIsLoading(true);

		axios
			.post('/api/reservations', {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing?.id,
			})
			.then(() => {
				toast.success('Listing reserved!');
				setDateRange(initialDateRange);
				// TODO: redirect to trips
				router.refresh();
			})
			.catch(() => {
				toast.error('Something went wrong.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInCalendarDays(
				dateRange.endDate,
				dateRange.startDate
			);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price]);

	return (
		<Wrapper>
			<div
				className='
          mx-auto
          max-w-screen-lg
        '
			>
				<div className='flex flex-col gap-6'>
					<ListingHeading
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div
						className='
              mt-6
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
            '
					>
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
						<div
							className='
                order-first
                mb-10
                md:order-last
                md:col-span-3
              '
						>
							<ListingReservation
								disabled={isLoading}
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value) => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabledDates={unavailableDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default ListingItem;
