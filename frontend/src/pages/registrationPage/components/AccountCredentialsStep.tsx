import { useFormContext } from 'react-hook-form';
import { RegisterForm } from '../model';
import { Input } from '../../../shared/components/input';
import { Button } from '../../../shared/components/button';
import { ArrowLeft } from 'lucide-react';
import { AuthStepActions } from '../../../shared/components/authStepActions';
import {
  createEmailValidation,
  createPasswordValidation,
} from '../../../shared/config';
import { createConfirmPasswordValidation } from '../../../shared/config/formValidation';

type Props = {
  backToPreviousStep: () => void;
  isLoading?: boolean;
};

export const AccountCredentialsStep = ({
  backToPreviousStep,
  isLoading,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterForm>();

  const email = register('email', createEmailValidation());

  const password = register('password', createPasswordValidation());

  const confirmPassword = register(
    'confirmPassword',
    createConfirmPasswordValidation(),
  );

  return (
    <>
      <Input
        {...email}
        label={'School email'}
        error={errors.email?.message}
        placeholder={'Enter school email'}
      />
      <Input
        {...password}
        type={'password'}
        label={'Password'}
        error={errors.password?.message}
        additionalText={'Must contain at least 8 characters'}
        placeholder={'Enter your password'}
      />
      <Input
        {...confirmPassword}
        type={'password'}
        label={'Confirm password'}
        error={errors.confirmPassword?.message}
        placeholder={'Confirm your password'}
      />
      <AuthStepActions>
        <Button type="submit" variant={'primary'} isLoading={isLoading}>
          Create school
        </Button>
        <Button
          type="button"
          variant={'defaultText'}
          onClick={backToPreviousStep}
          disabled={isLoading}
        >
          <ArrowLeft size={18} />
          Back
        </Button>
      </AuthStepActions>
    </>
  );
};
