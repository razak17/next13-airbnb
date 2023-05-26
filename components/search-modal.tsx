'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchQuery } from '@/types';
import { formatISO } from 'date-fns';
import qs from 'query-string';
import { Range } from 'react-date-range';

import { Country } from '@/lib/validations/listing';
import useMultiStepSearchForm, {
	SEARCH_STEPS,
} from '@/hooks/use-multi-step-search-form';
import useSearchModal from '@/hooks/use-search-modal';

import CountrySelect from './country-select';
import { DatePicker } from './ui/calendar';
import Counter from './ui/counter';
import Heading from './ui/heading';
import Modal from './ui/modal';

const SearchModal = () => {
	const router = useRouter();
	const searchModal = useSearchModal();
	const params = useSearchParams();

	const [location, setLocation] = useState<Country>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});

	const Map = useMemo(
		() =>
			dynamic(() => import('./map'), {
				ssr: false,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	);

	const {
		step,
		currentStepIndex,
		isFirstStep,
		isLastStep,
		goTo,
		goBack,
		goToNext,
	} = useMultiStepSearchForm([
		<div key={SEARCH_STEPS.LOCATION} className='flex flex-col gap-8'>
			<Heading
				title='Where do you wanna go?'
				subtitle='Find the perfect location!'
			/>
			<CountrySelect
				placeholder='Select Location'
				value={location}
				onChange={(value) => setLocation(value)}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>,
		<div key={SEARCH_STEPS.DATE} className='flex flex-col gap-8'>
			<Heading
				title='When do you plan to go?'
				subtitle='Make sure everyone is free!'
			/>
			<DatePicker
				onChange={(value) => setDateRange(value.selection)}
				value={dateRange}
			/>
		</div>,
		<div key={SEARCH_STEPS.INFO} className='flex flex-col gap-8'>
			<Heading title='More information' subtitle='Find your perfect place!' />
			<Counter
				onChange={(value) => setGuestCount(value)}
				value={guestCount}
				title='Guests'
				subtitle='How many guests are coming?'
			/>
			<hr />
			<Counter
				onChange={(value) => setRoomCount(value)}
				value={roomCount}
				title='Rooms'
				subtitle='How many rooms do you need?'
			/>
			<hr />
			<Counter
				onChange={(value) => {
					setBathroomCount(value);
				}}
				value={bathroomCount}
				title='Bathrooms'
				subtitle='How many bahtrooms do you need?'
			/>
		</div>,
	]);

	const isEmpty = useMemo(() => {
		switch (currentStepIndex) {
			case SEARCH_STEPS.LOCATION:
				return !location;
			default:
				return false;
		}
	}, [currentStepIndex, location]);

	const onSubmit = useCallback(async () => {
		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: SearchQuery = {
			...currentQuery,
			locationValue: location?.value as string,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		goTo(SEARCH_STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		params,
		location?.value,
		guestCount,
		roomCount,
		bathroomCount,
		dateRange.startDate,
		dateRange.endDate,
		goTo,
		searchModal,
		router,
	]);

	const actionLabel = useMemo(() => {
		if (isLastStep) {
			return 'Search';
		}
		return 'Next';
	}, [isLastStep]);

	const secondaryActionLabel = useMemo(() => {
		if (isFirstStep) {
			return undefined;
		}
		return 'Back';
	}, [isFirstStep]);

	return (
		<Modal
			disabled={isEmpty}
			isOpen={searchModal.isOpen}
			title='Filters'
			actionLabel={actionLabel}
			onSubmit={isLastStep ? onSubmit : goToNext}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={isFirstStep ? undefined : goBack}
			onClose={searchModal.onClose}
			body={step}
		/>
	);
};

export default SearchModal;
