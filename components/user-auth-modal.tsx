import { Dispatch, SetStateAction } from 'react';
import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import Button from './ui/button';

interface UserAuthModalFooterProps {
	register?: boolean;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	onToggle: () => void;
}

const UserAuthModalFooter = ({
	register,
	isLoading,
	setIsLoading,
	onToggle,
}: UserAuthModalFooterProps) => {
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
					disabled={isLoading}
					icon={FcGoogle}
					onClick={() => {
						setIsLoading(true);
						return signIn('google');
					}}
				/>
				<Button
					outline
					label='Continue with Github'
					disabled={isLoading}
					icon={AiFillGithub}
					onClick={() => {
						setIsLoading(true);
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
					{register ? 'Already have an account?' : 'First time using Airbnb?'}
					<span
						onClick={onToggle}
						className='
              cursor-pointer
              text-neutral-800
              hover:underline
            '
					>
						{' '}
						{register ? 'Log in' : 'Create an account'}
					</span>
				</p>
			</div>
		</div>
	);
};

export { UserAuthModalFooter };
