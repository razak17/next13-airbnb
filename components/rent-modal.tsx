'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Country, rentFormSchema } from '@/lib/validations/rent';
import useMultiStepRentForm, { STEPS } from '@/hooks/use-multi-step-rent-form';
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
	const router = useRouter();
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
	const price = watch('price');
	const title = watch('title');
	const description = watch('description');

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

	const {
		step,
		steps,
		currentStepIndex,
		isFirstStep,
		isLastStep,
		goTo,
		goBack,
		goToNext,
	} = useMultiStepRentForm([
		<RentCategoryStep
			key={STEPS.CATEGORY}
			category={category}
			onClick={(category) => customSetValue('category', category)}
		/>,
		<RentLocationStep
			key={STEPS.LOCATION}
			location={location}
			onChange={(value) => customSetValue('location', value)}
		/>,
		<RentInfoStep
			key={STEPS.INFO}
			guestCount={guestCount}
			guestCountChange={(value) => customSetValue('guestCount', value)}
			roomCount={roomCount}
			roomCountChange={(value) => customSetValue('roomCount', value)}
			bathroomCount={bathroomCount}
			bathroomCountChange={(value) => customSetValue('bathroomCount', value)}
		/>,
		<RentImageUploadStep
			key={STEPS.IMAGES}
			imageSrc={imageSrc}
			onChange={(value) => customSetValue('imageSrc', value)}
		/>,
		<RentDescriptionStep
			key={STEPS.DESCRIPTION}
			register={register}
			isLoading={isLoading}
			errors={errors}
		/>,
		<RentPriceStep
			key={STEPS.PRICE}
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

  const isEmpty = useMemo(() => {
    switch (currentStepIndex) {
      case STEPS.LOCATION:
        return !location;
      case STEPS.IMAGES:
        return !imageSrc;
      case STEPS.DESCRIPTION:
        return !title || !description;
      default:
        return false;
    }
  }, [currentStepIndex, location, imageSrc, title, description]);

  console.log({currentStepIndex, isEmpty, location})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (!isLastStep) return goToNext();
	};

	return (
		<Modal
			disabled={isLoading || isEmpty}
			isOpen={rentModal.isOpen}
			title='Airbnb your home!'
			actionLabel={actionLabel}
      onSubmit={isLastStep ? handleSubmit(onSubmit) : goToNext}
			secondaryDisabled={isLoading}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={isFirstStep ? undefined : goBack}
			onClose={rentModal.onClose}
			body={step}
		/>
	);
};

export default RentModal;
