'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import Button from './ui/button';

type EmptyPlaceholderProps = React.HTMLAttributes<HTMLDivElement>;

export function EmptyPlaceholder({
	className,
	children,
	...props
}: EmptyPlaceholderProps) {
	return (
		<div
			className={cn(
				'flex h-[60vh] flex-col items-center justify-center gap-2',
				className
			)}
			{...props}
		>
			<div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>
				{children}
			</div>
		</div>
	);
}

type EmptyPlacholderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function EmptyPlaceholderTitle({
	className,
	...props
}: EmptyPlacholderTitleProps) {
	return (
		<h2 className={cn('mt-6 text-xl font-semibold', className)} {...props} />
	);
}

type EmptyPlacholderDescriptionProps =
	React.HTMLAttributes<HTMLParagraphElement>;

export function EmptyPlaceholderDescription({
	className,
	...props
}: EmptyPlacholderDescriptionProps) {
	return (
		<p
			className={cn(
				'text-muted-foreground mb-8 mt-2 text-center text-sm font-normal leading-6',
				className
			)}
			{...props}
		/>
	);
}

interface EmptyPlacholderButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	label: string;
	redirect?: string;
}

export function EmptyPlaceholderButton({
	label,
  redirect = '/',
	...props
}: EmptyPlacholderButtonProps) {
	const router = useRouter();

	return (
		<div className='mt-4 w-48'>
			<Button
				outline
				label={label}
				onClick={() => router.push(redirect)}
				{...props}
			/>
		</div>
	);
}
