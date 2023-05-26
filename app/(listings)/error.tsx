'use client';

import { useEffect } from 'react';

import {
	EmptyPlaceholder,
	EmptyPlaceholderDescription,
	EmptyPlaceholderTitle,
} from '@/components/empty-placeholder';

interface ErrorStateProps {
	error: Error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
	useEffect(() => {
		// eslint-disable-next-line no-console
		console.error(error);
	}, [error]);

	return (
		<EmptyPlaceholder>
			<EmptyPlaceholderTitle>Uh Oh!</EmptyPlaceholderTitle>
			<EmptyPlaceholderDescription>
				We couldn&apos;t load the listings. Please try again later.
			</EmptyPlaceholderDescription>
		</EmptyPlaceholder>
	);
};

export default ErrorState;
