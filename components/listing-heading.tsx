'use client';

import Image from 'next/image';
import { AuthenticatedUser } from '@/types';

import useCountries from '@/hooks/use-countries';

import HeartButton from './heart-button';
import Heading from './ui/heading';

interface ListingHeadProps {
	id: string;
	title: string;
	imageSrc: string;
	locationValue: string;
	currentUser?: AuthenticatedUser | null;
}

const ListingHeading = ({
	id,
	title,
	imageSrc,
	locationValue,
	currentUser,
}: ListingHeadProps) => {
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div
				className='
          relative
          h-[60vh]
          w-full 
          overflow-hidden
          rounded-xl
        '
			>
				<Image
					src={imageSrc}
					fill
					className='w-full object-cover'
					alt='Image'
				/>
				<div
					className='
            absolute
            right-5
            top-5
          '
				>
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
};

export default ListingHeading;
