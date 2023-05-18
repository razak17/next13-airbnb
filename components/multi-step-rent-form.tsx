'use client';

import { Category } from '@/types';

import { categories } from '@/config/categories';
import { Country } from '@/lib/validations/rent';
import useCountries from '@/hooks/use-countries';

import CountrySelect from './country-select';
import RentCategoryItem from './rent-category-item';
import Heading from './ui/heading';

const RentCategoryStep = ({
	category,
	onClick,
}: {
	category: Category;
	// eslint-disable-next-line no-unused-vars
	onClick: (category: Category) => void;
}) => {
	return (
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
};

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
		</div>
	);
};

const RentInfoStep = () => {
	return (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Share some basics about your place'
				subtitle='What amenitis do you have?'
			/>
		</div>
	);
};

const RentImagesStep = () => {
	return (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Add a photo of your place'
				subtitle='Show guests what your place looks like!'
			/>
		</div>
	);
};

const RentDescriptionStep = () => {
	return (
		<div className='flex flex-col gap-8'>
			<Heading
				title='How would you describe your place?'
				subtitle='Short and sweet works best!'
			/>
		</div>
	);
};

export {
	RentCategoryStep,
	RentLocationStep,
	RentInfoStep,
	RentImagesStep,
	RentDescriptionStep,
};
