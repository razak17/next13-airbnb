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
	RentImageUploadStep,
	RentInfoStep,
	RentLocationStep,
    RentPriceStep,
} from './multi-step-rent-form';
import Modal from './ui/modal';

export type RentFormData = z.infer<typeof rentFormSchema>;

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
		defaultValues: {
			category: 'Beach',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const category = watch('category');
	const location = watch('location');
	const guestCount = watch('guestCount');
	const roomCount = watch('roomCount');
	const bathroomCount = watch('bathroomCount');
	const imageSrc = watch('imageSrc');

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
				key={0}
				category={category}
				onClick={(category) => customSetValue('category', category)}
			/>,
			<RentLocationStep
				key={1}
				location={location}
				onChange={(value) => customSetValue('location', value)}
			/>,
			<RentInfoStep
				key={2}
				guestCount={guestCount}
				guestCountChange={(value) => customSetValue('guestCount', value)}
				roomCount={roomCount}
				roomCountChange={(value) => customSetValue('roomCount', value)}
				bathroomCount={bathroomCount}
				bathroomCountChange={(value) => customSetValue('bathroomCount', value)}
			/>,
			<RentImageUploadStep
				key={3}
				imageSrc={imageSrc}
				onChange={(value) => customSetValue('imageSrc', value)}
			/>,
			<RentDescriptionStep
				key={4}
				register={register}
				isLoading={isLoading}
				errors={errors}
			/>,
			<RentPriceStep
				key={5}
				register={register}
				isLoading={isLoading}
				errors={errors}
			/>,
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
