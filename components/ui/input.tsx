'use client';

import * as React from 'react';
import { FieldError } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	formatPrice?: boolean;
	errors?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ type, label, errors, formatPrice, ...props }, ref) => {
		return (
			<div className='relative w-full'>
				{formatPrice && (
					<BiDollar
						size={24}
						className='
            absolute
            left-2
            top-5
            text-neutral-700
          '
					/>
				)}
				<input
					placeholder=' '
					type={type}
					ref={ref}
					{...props}
					className={`
          peer
          w-full
          rounded-md
          border-2
          bg-white
          p-4
          pt-6
          font-light
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors ? 'border-rose-500' : 'border-neutral-300'}
          ${errors ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
				/>
				<label
					className={`
          text-m
          absolute
          top-5
          z-10
          origin-[0]
          -translate-y-3
          duration-150
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${errors ? 'text-rose-500' : 'text-zinc-400'}
        `}
				>
					{label}
				</label>
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
