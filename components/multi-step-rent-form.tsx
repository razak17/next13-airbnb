'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Category } from '@/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { categories } from '@/config/categories';
import { Country } from '@/lib/validations/rent';
import useCountries from '@/hooks/use-countries';

import CountrySelect from './country-select';
import ImageUpload from './image-upload';
import RentCategoryItem from './rent-category-item';
import { RentFormData } from './rent-modal';
import Counter from './ui/counter';
import Heading from './ui/heading';
import Input from './ui/input';

const RentCategoryStep = ({
	category,
	onClick,
}: {
	category: Category;
	// eslint-disable-next-line no-unused-vars
	onClick: (category: Category) => void;
}) => (
	<div className='flex flex-col gap-8'>
		<Heading
			title='Which of these best describes your place?'
			subtitle='Pick a category'
		/>
		<div
			className='
          grid 
          max-h-[50vh] 
          grid-cols-1 
          gap-3
          overflow-y-auto
          md:grid-cols-2
        '
		>
			{categories.map((item) => (
				<div key={item.label} className='col-span-1'>
					<RentCategoryItem
						onClick={onClick}
						selected={category === item.label}
						label={item.label}
						icon={item.icon}
					/>
				</div>
			))}
		</div>
	</div>
);

const RentLocationStep = ({
	location,
	onChange,
}: {
	location?: Country;
	// eslint-disable-next-line no-unused-vars
	onChange: (value: Country) => void;
}) => {
	const { getAll } = useCountries();
	const options = getAll();

	const Map = useMemo(
		() =>
			dynamic(() => import('./map'), {
				ssr: false,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	);

	return (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Where is your place located?'
				subtitle='Help guests find you!'
			/>
			<CountrySelect
				placeholder='Select Country'
				value={location}
				options={options}
				onChange={onChange}
			/>
			<Map center={location?.latlng} />
		</div>
	);
};

const RentInfoStep = ({
	guestCount,
	guestCountChange,
	roomCount,
	roomCountChange,
	bathroomCount,
	bathroomCountChange,
}: {
	guestCount: number;
	guestCountChange: (value: number) => void;
	roomCount: number;
	roomCountChange: (value: number) => void;
	bathroomCount: number;
	bathroomCountChange: (value: number) => void;
}) => (
	<div className='flex flex-col gap-8'>
		<Heading
			title='Share some basics about your place'
			subtitle='What amenitis do you have?'
		/>
		<Counter
			onChange={guestCountChange}
			value={guestCount}
			title='Guests'
			subtitle='How many guests do you allow?'
		/>
		<hr />
		<Counter
			onChange={roomCountChange}
			value={roomCount}
			title='Rooms'
			subtitle='How many rooms do you have?'
		/>
		<hr />
		<Counter
			onChange={bathroomCountChange}
			value={bathroomCount}
			title='Bathrooms'
			subtitle='How many bathrooms do you have?'
		/>
	</div>
);

const RentImageUploadStep = ({
	imageSrc,
	onChange,
}: {
	imageSrc: string;
	onChange: (value: string) => void;
}) => (
	<div className='flex flex-col gap-8'>
		<Heading
			title='Add a photo of your place'
			subtitle='Show guests what your place looks like!'
		/>
		<ImageUpload value={imageSrc} onChange={onChange} />
	</div>
);

const RentDescriptionStep = ({
	register,
	errors,
	isLoading,
}: {
	register: UseFormRegister<RentFormData>;
	errors: FieldErrors<RentFormData>;
	isLoading: boolean;
}) => (
	<div className='flex flex-col gap-8'>
		<Heading
			title='How would you describe your place?'
			subtitle='Short and sweet works best!'
		/>
		<Input
			id='title'
			label='Title'
			disabled={isLoading}
			errors={errors['title']}
			{...register('title')}
		/>
		<hr />
		<Input
			id='description'
			label='Description'
			disabled={isLoading}
			errors={errors['description']}
			{...register('description')}
		/>
	</div>
);

const RentPriceStep = ({
	register,
	errors,
	isLoading,
}: {
	register: UseFormRegister<RentFormData>;
	errors: FieldErrors<RentFormData>;
	isLoading: boolean;
}) => (
	<div className='flex flex-col gap-8'>
		<Heading
			title='Now, set your price'
			subtitle='How much do you charge per night?'
		/>
		<Input
      min={1}
			id='price'
			label='Price'
			formatPrice
			type='number'
			disabled={isLoading}
			errors={errors['price']}
			{...register('price')}
		/>
	</div>
);

export {
	RentCategoryStep,
	RentLocationStep,
	RentInfoStep,
	RentImageUploadStep,
	RentDescriptionStep,
	RentPriceStep,
};
