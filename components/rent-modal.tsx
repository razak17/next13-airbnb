'use client';

import { useMemo, useState } from 'react';

import useRentModal from '@/hooks/use-rent-modal';

import Heading from './ui/heading';
import Modal from './ui/modal';

/* eslint-disable no-unused-vars */
enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

/* eslint-enable no-unused-vars */

const RentModal = () => {
	const rentModal = useRentModal();
	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create';
		}

		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return 'Back';
	}, [step]);

	let bodyContent = (
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
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentModal.isOpen}
			title='Airbnb your home!'
			actionLabel={actionLabel}
			onSubmit={rentModal.onClose}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			onClose={rentModal.onClose}
			body={bodyContent}
		/>
	);
};

export default RentModal;
