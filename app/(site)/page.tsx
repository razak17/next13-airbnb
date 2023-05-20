import UseClient from '@/hooks/use-client';
import Wrapper from '@/components/ui/wrapper';
import {
	EmptyPlaceholder,
	EmptyPlaceholderButton,
	EmptyPlaceholderDescription,
	EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';

export default function Home() {
	const isEmpty = true;

	if (isEmpty)
		return (
			<UseClient>
				<EmptyPlaceholder>
					<EmptyPlaceholderTitle>No matches found</EmptyPlaceholderTitle>
					<EmptyPlaceholderDescription>
						There are no listings that match your search criteria. Try removing
						some filters.
					</EmptyPlaceholderDescription>
					<EmptyPlaceholderButton label='Remove all filters' resetFilter />
				</EmptyPlaceholder>
			</UseClient>
		);

	return (
		<UseClient>
			<Wrapper>
				<div
					className='
            grid
            grid-cols-1 
            gap-8 
            pt-24 
            sm:grid-cols-2 
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          '
				>
					<div>Listing Go Here</div>
				</div>
			</Wrapper>
		</UseClient>
	);
}
