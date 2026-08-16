import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../shared/config';
import { useEffect, useState } from 'react';
import { useVerificationToken } from './hooks';
import { SuccessVerification } from './component';
import { FailedVerification } from '../../shared/components/failedLinkVerificationComponent';
import { MailType } from '../../app/api/auth/request';
import { MailVerificationResult } from '../../app/api/auth/response';

export const MailVerificationPage = () => {
  const { token } = useParams();
  const [verificationResult, setVerificationResult] =
    useState<MailVerificationResult | null>(null);
  const { submit, isLoading, submitError } = useVerificationToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.HOME, {
        replace: true,
      });
    }

    submit(token!, MailType.REGISTRATION).then(r =>
      setVerificationResult(r!.result),
    );
  });

  const isSuccess =
    !submitError && !isLoading && verificationResult === 'VERIFIED';

  return (
    <>
      {isSuccess && <SuccessVerification />}
      {!isSuccess && (
        <FailedVerification
          verificationResult={verificationResult!}
          token={token}
          type={MailType.REGISTRATION}
        />
      )}
    </>
  );
};
