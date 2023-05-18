'use client';

import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Country, rentFormSchema } from '@/lib/validations/rent';
import useMultiStepRentForm from '@/hooks/use-multi-step-rent-form';
import useRentModal from '@/hooks/use-rent-modal';

import {
	RentCategoryStep,
	RentDescriptionStep,
	RentImagesStep,
	RentInfoStep,
	RentLocationStep,
} from './multi-step-rent-form';
import Modal from './ui/modal';

type RentFormData = z.infer<typeof rentFormSchema>;

const RentModal = () => {
	const rentModal = useRentModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<RentFormData>({
		resolver: zodResolver(rentFormSchema),
	});

	const category = watch('category');
	const location = watch('location');

	const customSetValue = (
		id: keyof RentFormData,
		value: string | number | Country
	) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const { steps, currentStepIndex, isFirstStep, isLastStep, goBack, goToNext } =
		useMultiStepRentForm([
			<RentCategoryStep
				key={1}
				category={category}
				onClick={(category) => customSetValue('category', category)}
			/>,
			<RentLocationStep
				key={2}
				location={location}
				onChange={(value) => customSetValue('location', value)}
			/>,
			<RentInfoStep key={3} />,
			<RentImagesStep key={4} />,
			<RentDescriptionStep key={5} />,
		]);

	const actionLabel = useMemo(() => {
		if (isLastStep) {
			return 'Create';
		}
		return 'Next';
	}, [isLastStep]);

	const secondaryActionLabel = useMemo(() => {
		if (isFirstStep) {
			return undefined;
		}
		return 'Back';
	}, [isFirstStep]);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (!isLastStep) return goToNext();
	};

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentModal.isOpen}
			title='Airbnb your home!'
			actionLabel={actionLabel}
			onSubmit={goToNext}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={isFirstStep ? undefined : goBack}
			onClose={rentModal.onClose}
			body={steps[currentStepIndex]}
		/>
	);
};

export default RentModal;
