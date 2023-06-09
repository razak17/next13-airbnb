'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

import { loginFormSchema } from '@/lib/validations/auth';
import useLoginModal from '@/hooks/use-login-modal';
import useRegisterModal from '@/hooks/use-register-modal';

import Heading from './ui/heading';
import Input from './ui/input';
import Modal from './ui/modal';
import { UserAuthModalFooter } from './user-auth-modal';

type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);
	const [isGitHubLoading, setIsGitHubLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
	});

	const onToggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const onSubmit: SubmitHandler<LoginFormData> = (data) => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success('Logged in');
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome back' subtitle='Login to your account!' />
			<Input
				id='email'
				label='Email'
				disabled={isLoading || isGitHubLoading || isGoogleLoading}
				errors={errors['email']}
				{...register('email')}
			/>
			<Input
				id='password'
				label='Password'
				type='password'
				disabled={isLoading || isGitHubLoading || isGoogleLoading}
				errors={errors['password']}
				{...register('password')}
			/>
		</div>
	);

	const footerContent = (
		<UserAuthModalFooter
			onToggle={onToggle}
			disabled={isLoading || isGitHubLoading || isGoogleLoading}
			setIsGitHubLoading={setIsGitHubLoading}
			setIsGoogleLoading={setIsGoogleLoading}
		/>
	);

	return (
		<Modal
			disabled={isLoading || isGitHubLoading || isGoogleLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Login'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
