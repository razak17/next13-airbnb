'use client';

import { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

import { registerFormSchema } from '@/lib/validations/auth';
import useLoginModal from '@/hooks/use-login-modal';
import useRegisterModal from '@/hooks/use-register-modal';

import Heading from './ui/heading';
import Input from './ui/input';
import Modal from './ui/modal';
import { UserAuthModalFooter } from './user-auth-modal';

type RegisterFormData = z.infer<typeof registerFormSchema>;

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const [isGitHubLoading, setIsGitHubLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const onToggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [registerModal, loginModal]);

	const onSubmit = (data: RegisterFormData) => {
		setIsLoading(true);

		axios
			.post('/api/register', data)
			.then(() => {
				toast.success('Registered!');
				registerModal.onClose();
				loginModal.onOpen();
			})
			.catch((error) => {
				toast.error(error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome to Airbnb' subtitle='Create an account!' />
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				errors={errors['email']}
				{...register('email')}
			/>
			<Input
				id='name'
				label='Name'
				disabled={isLoading}
				errors={errors['name']}
				{...register('name')}
			/>
			<Input
				id='password'
				label='Password'
				type='password'
				disabled={isLoading}
				errors={errors['password']}
				{...register('password')}
			/>
		</div>
	);

	const footerContent = (
		<UserAuthModalFooter
			register
			onToggle={onToggle}
			disabled={isLoading || isGitHubLoading || isGoogleLoading}
			setIsGitHubLoading={setIsGitHubLoading}
			setIsGoogleLoading={setIsGoogleLoading}
		/>
	);

	return (
		<Modal
			disabled={isLoading || isGitHubLoading || isGoogleLoading}
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Register'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
