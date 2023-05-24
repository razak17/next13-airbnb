'use client';

import { useCallback, useState } from 'react';
import { AuthenticatedUser, RentListing } from '@/types';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import ListingCard from './listing-card';
import Heading from './ui/heading';
import Wrapper from './ui/wrapper';

interface TripsClientProps {
	listings: RentListing[];
	currentUser?: AuthenticatedUser | null;
}

const ProperyItem = ({ listings, currentUser }: TripsClientProps) => {
	const [targetPropetyId, setTargetPropertyId] = useState('');

	const onDelete = useCallback(
		(listingId: string) => {
			setTargetPropertyId(listingId);
		}
	);

	return (
		<Wrapper>
			<Heading
				title='Trips'
				subtitle="Where you've been and where you're going"
			/>
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
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onDelete}
						disabled={targetPropetyId === listing.id}
						actionLabel='Delete property'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Wrapper>
	);
};

export default ProperyItem;
