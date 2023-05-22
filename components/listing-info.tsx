'use client';

import dynamic from 'next/dynamic';
import { AuthenticatedUser } from '@/types';
import { IconType } from 'react-icons';

import useCountries from '@/hooks/use-countries';

import ListingCategory from './listing-category';
import Avatar from './ui/avatar';

const Map = dynamic(() => import('./map'), {
	ssr: false,
});

interface ListingInfoProps {
	user: AuthenticatedUser;
	description: string;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	category?: {
		label: string;
		description: string;
		icon: IconType;
	};
	locationValue: string;
}

const ListingInfo = ({
	user,
	description,
	guestCount,
	roomCount,
	bathroomCount,
	category,
	locationValue,
}: ListingInfoProps) => {
	const { getByValue } = useCountries();

	const coordinates = getByValue(locationValue)?.latlng;

	return (
		<div className='col-span-4 flex flex-col gap-8'>
			<div className='flex flex-col gap-2'>
				<div
					className='
            flex 
            flex-row 
            items-center 
            gap-2 
            text-xl
            font-semibold
          '
				>
					<div>Hosted by {user?.name}</div>
					<Avatar src={user?.image as string} />
				</div>
				<div
					className='
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          '
				>
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category?.label}
					description={category?.description}
				/>
			)}
			<hr />
			<div
				className='
      text-lg font-light text-neutral-500'
			>
				{description}
			</div>
			<hr />
			<Map center={coordinates} />
		</div>
	);
};

export default ListingInfo;
