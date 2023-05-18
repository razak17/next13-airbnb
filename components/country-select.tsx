'use client';

import { default as ReactSelect } from 'react-select';

import { Country } from '@/lib/validations/rent';

interface CountrySelectProps {
	options: Country[];
	placeholder: string;
	value?: Country;
	// eslint-disable-next-line no-unused-vars
	onChange: (value: Country) => void;
}

const CountrySelect = ({
	value,
	options,
	onChange,
	placeholder,
}: CountrySelectProps) => {
	return (
		<div>
			<ReactSelect
				placeholder={placeholder}
				isClearable
				options={options}
				value={value}
				onChange={(value) => onChange(value as Country)}
				formatOptionLabel={(option) => (
					<div
						className='
          flex flex-row items-center gap-3'
					>
						<div>{option.flag}</div>
						<div>
							{option.label},
							<span className='ml-1 text-neutral-500'>{option.region}</span>
						</div>
					</div>
				)}
				classNames={{
					control: () => 'p-3 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg',
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: 'black',
						primary25: '#ffe4e6',
					},
				})}
			/>
		</div>
	);
};

export default CountrySelect;
