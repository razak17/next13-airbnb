'use client';

import { useMemo } from 'react';
import { AuthenticatedUser, ListingResevation, RentListing } from '@/types';

import { categories } from '@/config/categories';

import ListingHeading from './listing-heading';
import ListingInfo from './listing-info';
import Wrapper from './ui/wrapper';

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
	const category = useMemo(() => {
		return categories.find((items) => items.label === listing.category);
	}, [listing.category]);

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
						></div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default ListingItem;
