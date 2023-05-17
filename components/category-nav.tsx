'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { categories } from '@/config/categories';

import CategoryNavItem from './category-nav-item';
import Wrapper from './ui/wrapper';

const CategoryNav = () => {
	const params = useSearchParams();
	const category = params?.get('category');
	const pathname = usePathname();
	const isHome = pathname === '/';

	if (!isHome) {
		return null;
	}

	return (
		<Wrapper>
			<div
				className='
          flex 
          flex-row
          items-center 
          justify-between 
          overflow-x-auto
          pt-4
        '
			>
				{categories.map((item) => (
					<CategoryNavItem
						key={item.label}
						label={item.label}
						icon={item.icon}
						selected={category === item.label.toLowerCase()}
					/>
				))}
			</div>
		</Wrapper>
	);
};

export default CategoryNav;
