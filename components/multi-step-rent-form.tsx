'use client';

import Heading from './ui/heading';
import { categories } from '@/config/categories';
import RentCategoryItem from './rent-category-item';
import { Category} from '@/types';

const RentCategoryStep = ({category, onClick}: {category: Category, onClick: (category: Category) => void}) => {
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

const RentLocationStep = () => {
	return (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Where is your place located?'
				subtitle='Help guests find you!'
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
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />
    </div>
  )
}

const RentDescriptionStep = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />
    </div>
  )
}

export {
  RentCategoryStep,
  RentLocationStep,
  RentInfoStep,
  RentImagesStep,
  RentDescriptionStep
}
