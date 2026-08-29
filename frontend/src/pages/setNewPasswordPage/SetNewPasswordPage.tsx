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
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MailVerificationResult } from '../../app/api/auth/response';
import { FailedVerification } from '../../shared/components/failedLinkVerificationComponent';
import { LoadingPage } from '../loadingPage';
import { useVerifyMailTokenMutation } from '../../app/api';

export const SetNewPasswordPage = () => {
  const { token } = useParams();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [verificationResult, setVerificationResult] =
    useState<MailVerificationResult | null>(null);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm<SetNewPasswordForm>();
  const { changePassword, isLoading } = useChangePasswordForm();
  const [submit, { isLoading: isLoadingVerification }] =
    useVerifyMailTokenMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.HOME, {
        replace: true,
      });

      return;
    }

    submit({ token })
      .unwrap()
      .then(r => {
        if (r) {
          setVerificationResult(r.result);
        }
      })
      .catch(() => {
        setVerificationFailed(true);
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

  const isVerified = verificationResult === MailVerificationResult.VERIFIED;
  const shouldShowFailedVerification =
    (!isPageLoading && verificationResult !== null && !isVerified) ||
    verificationFailed;

  if (isPageLoading || isLoadingVerification) {
    return <LoadingPage message={'Verifying your email...'} />;
  }

  if (shouldShowFailedVerification) {
    return (
      <FailedVerification
        verificationResult={verificationResult ?? undefined}
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
