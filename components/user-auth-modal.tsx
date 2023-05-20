import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import Button from './ui/button';

interface UserAuthModalFooterPrps {
	register?: boolean;
	disabled: boolean;
	setIsGitHubLoading: (value: boolean) => void;
	setIsGoogleLoading: (value: boolean) => void;
	onToggle: () => void;
}

const UserAuthModalFooter = ({
	register,
	disabled,
	setIsGitHubLoading,
	setIsGoogleLoading,
	onToggle,
}: UserAuthModalFooterPrps) => {
	return (
		<div className='mt-3 flex flex-col gap-4'>
			<hr />
			<div
				className='
        flex
        flex-col
        gap-4
        md:flex-row
        '
			>
				<Button
					outline
					label='Continue with Google'
					disabled={disabled}
					icon={FcGoogle}
					onClick={() => {
						setIsGoogleLoading(true);
						signIn('google');
					}}
				/>
				<Button
					outline
					label='Continue with Github'
					disabled={disabled}
					icon={AiFillGithub}
					onClick={() => {
						setIsGitHubLoading(true);
						signIn('github');
					}}
				/>
			</div>
			<div
				className='
          mt-4
          text-center
          font-light
          text-neutral-500
        '
			>
				<p>
					{register ? 'Already have an account? ' : 'First time using Airbnb? '}
					<span
						onClick={onToggle}
						className='
              cursor-pointer
              text-neutral-800
              hover:underline
            '
					>
						{register ? 'Log in' : 'Create an account'}
					</span>
				</p>
			</div>
		</div>
	);
};

export { UserAuthModalFooter };
