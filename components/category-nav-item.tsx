'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types';
import qs from 'query-string';
import { IconType } from 'react-icons';

interface CategoryNavItemProps {
	icon: IconType;
	label: Category;
	selected?: boolean;
}

const CategoryNavItem = ({
	icon: Icon,
	label,
	selected,
}: CategoryNavItemProps) => {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: { category?: Category } = {
			...currentQuery,
			category: label.toLowerCase() as Category,
		};

		const category = params?.get('category');
		if (category === label.toLowerCase()) {
			delete updatedQuery.category;
		}

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		router.push(url);
	}, [label, router, params]);

	return (
		<div
			onClick={handleClick}
			className={`
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        gap-2
        border-b-2
        p-3
        transition
        hover:text-neutral-800
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
		>
			<Icon size={26} />
			<div className='text-sm font-medium'>{label}</div>
		</div>
	);
};

export default CategoryNavItem;
