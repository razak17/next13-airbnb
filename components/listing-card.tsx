'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthenticatedUser, ListingResevation, RentListing } from '@/types';
import { format } from 'date-fns';

import useCountries from '@/hooks/use-countries';

import HeartButton from './heart-button';
import Button from './ui/button';

interface ListingCardProps {
	data: RentListing;
	reservation?: ListingResevation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: AuthenticatedUser | null;
}

const ListingCard = ({
	currentUser,
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = '',
}: ListingCardProps) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const listingLocation = getByValue(data.locationValue);

	const listingPrice = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}

		return data.price;
	}, [reservation, data.price]);

	const listingReservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, 'PP')} - ${format(end, 'PP')}`;
	}, [reservation]);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled) {
				return;
			}

			onAction?.(actionId);
		},
		[disabled, onAction, actionId]
	);

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className='group col-span-1 cursor-pointer'
		>
			<div className='flex w-full flex-col gap-2'>
				<div
					className='
            relative 
            aspect-square 
            w-full 
            overflow-hidden 
            rounded-xl
          '
				>
					<Image
						fill
						className='
              h-full 
              w-full 
              object-cover 
              transition 
              group-hover:scale-110
            '
						src={data.imageSrc}
						alt='Listing'
					/>
					<div
						className='
            absolute
            right-3
            top-3
          '
					>
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<div className='text-lg font-semibold'>
					{listingLocation?.region}, {listingLocation?.label}
				</div>
				<div className='font-light text-neutral-500'>
					{listingReservationDate || data.category}
				</div>
				<div className='flex flex-row items-center gap-1'>
					<div className='font-semibold'>$ {listingPrice}</div>
					{!reservation && <div className='font-light'>night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	);
};

export default ListingCard;
