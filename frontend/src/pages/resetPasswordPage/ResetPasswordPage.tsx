import { Input } from '../../shared/components/input';
import { AuthStepActions } from '../../shared/components/authStepActions';
import { Button } from '../../shared/components/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createEmailValidation, ROUTES } from '../../shared/config';
import { AuthHeader } from '../../shared/components/authHeader';
import { ResetPasswordForm } from './model';
import { useResetPasswordForm } from './hooks/useResetPasswordForm';
import { Form } from '../../shared/components/form';
import { useAppForm } from '../../shared/hooks';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm<ResetPasswordForm>();
  const { resetPassword, isLoading } = useResetPasswordForm();

  const email = register('email', createEmailValidation());

  return (
    <>
      <AuthHeader
        header={'Forgot password?'}
        subHeader={"Enter your email and we'll send you a password reset link."}
      />
      <Form onSubmit={handleSubmit(data => resetPassword(data))}>
        <Input
          {...email}
          label={'Email'}
          placeholder={'Enter your email'}
          error={errors.email?.message}
        />
        <AuthStepActions>
          <Button type={'submit'} variant={'primary'} isLoading={isLoading}>
            Send Reset Email
          </Button>
          <Button
            type={'button'}
            variant={'defaultText'}
            onClick={() => navigate(ROUTES.LOGIN)}
            disabled={isLoading}
          >
            <ArrowLeft size={18} />
            Back to Login
          </Button>
        </AuthStepActions>
      </Form>
    </>
  );
};
