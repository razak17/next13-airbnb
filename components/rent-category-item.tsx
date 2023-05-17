'use client';

import { Category } from '@/types';
import { IconType } from 'react-icons';

interface RentCategoryItemProps {
	icon: IconType;
	label: Category;
	selected?: boolean;
	// eslint-disable-next-line no-unused-vars
	onClick: (value: Category) => void;
}

const RentCategoryItem = ({
	icon: Icon,
	label,
	selected,
	onClick,
}: RentCategoryItemProps) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={`
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-4
        transition
        hover:border-black
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
		>
			<Icon size={30} />
			<div className='font-semibold'>{label}</div>
		</div>
	);
};

export default RentCategoryItem;
