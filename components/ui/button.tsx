'use client';

import * as React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ label, outline, small, icon: Icon, ...props }, ref) => {
		return (
			<button
				ref={ref}
				{...props}
				className={`
        relative
        w-full
        rounded-lg
        transition
        hover:opacity-80
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
			>
				{Icon && (
					<Icon
						size={24}
						className='
            absolute
            left-4
            top-3
          '
					/>
				)}
				{label}
			</button>
		);
	}
);

Button.displayName = 'Button';

export default Button;
