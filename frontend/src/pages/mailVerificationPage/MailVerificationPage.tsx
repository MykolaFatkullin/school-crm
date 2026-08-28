import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../shared/config';
import { useEffect, useState } from 'react';
import { SuccessVerification } from './component';
import { FailedVerification } from '../../shared/components/failedLinkVerificationComponent';
import { MailVerificationResult } from '../../app/api/auth/response';
import { LoadingPage } from '../loadingPage';
import { useVerifyMailTokenMutation } from '../../app/api';

export const MailVerificationPage = () => {
  const { token } = useParams();
  const [verificationResult, setVerificationResult] =
    useState<MailVerificationResult | null>(null);
  const [submit, { isLoading }] = useVerifyMailTokenMutation();
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
      });
  }, [token, navigate, submit]);

  const isSuccess =
    !isLoading && verificationResult === MailVerificationResult.VERIFIED;

  if (isLoading) {
    return <LoadingPage message={'Verifying your email...'} />;
  }

  if (isSuccess) {
    return <SuccessVerification />;
  }

  return (
    <FailedVerification verificationResult={verificationResult} token={token} />
  );
};
