import { AuthHeader } from '../../shared/components/authHeader';
import { AuthStepActions } from '../../shared/components/authStepActions';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { Form } from '../../shared/components/form';
import { useAppForm } from '../../shared/hooks';
import { SetNewPasswordForm } from './model';
import { createPasswordValidation, ROUTES } from '../../shared/config';
import { createConfirmPasswordValidation } from '../../shared/config/formValidation';
import { useChangePasswordForm } from './hooks';
import { Alert } from '../../shared/components/alert';
import { useEffect, useState } from 'react';
import { useVerificationToken } from '../mailVerificationPage/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { MailType } from '../../app/api/auth/request';
import { MailVerificationResult } from '../../app/api/auth/response';
import { FailedVerification } from '../../shared/components/failedLinkVerificationComponent';
import { LoadingPage } from '../loadingPage';

export const SetNewPasswordPage = () => {
  const { token } = useParams();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [verificationResult, setVerificationResult] =
    useState<MailVerificationResult | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm<SetNewPasswordForm>();
  const { changePassword, isLoading, submitError } = useChangePasswordForm();
  const { submit } = useVerificationToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.HOME, {
        replace: true,
      });

      return;
    }

    submit(token)
      .then(r => {
        if (r) {
          setVerificationResult(r.result);
        }
      })
      .finally(() => setIsPageLoading(false));
  }, [token, submit, navigate]);

  const password = register('password', createPasswordValidation());
  const confirmPassword = register(
    'confirmPassword',
    createConfirmPasswordValidation(),
  );

  const onSubmit = (data: SetNewPasswordForm) => {
    void changePassword(data, token!);
  };

  const isVerificationResolved = verificationResult !== null;
  const isVerified = verificationResult === 'VERIFIED';
  const shouldShowFailedVerification =
    isVerificationResolved && !isVerified && !isPageLoading;

  if (isPageLoading) {
    return <LoadingPage message={'Verifying your email...'} />;
  }

  if (shouldShowFailedVerification) {
    return (
      <FailedVerification
        verificationResult={verificationResult!}
        token={token}
      />
    );
  }

  return (
    <>
      <AuthHeader
        header={'Reset password'}
        subHeader={'Enter your new password below'}
      />
      {submitError && <Alert message={submitError} />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...password}
          type={'password'}
          label={'New Password'}
          placeholder={'Enter new password'}
          additionalText={'Must contain at least 8 characters'}
          error={errors.password?.message}
        />
        <Input
          {...confirmPassword}
          type={'password'}
          label={'Confirm Password'}
          placeholder={'Confirm new password'}
          error={errors.confirmPassword?.message}
        />
        <AuthStepActions>
          <Button variant={'primary'} type="submit" isLoading={isLoading}>
            Update Password
          </Button>
        </AuthStepActions>
      </Form>
    </>
  );
};
