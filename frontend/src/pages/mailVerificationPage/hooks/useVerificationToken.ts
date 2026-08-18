import { useVerifyMailToken } from '../../../app/hooks/auth';
import { parseApiError } from '../../../app/api';
import { useCallback, useState } from 'react';
import { MailType } from '../../../app/api/auth/request';

export const useVerificationToken = () => {
  const { verifyMailToken, isLoading } = useVerifyMailToken();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = useCallback(
    async (token: string, type: MailType) => {
      try {
        const request = { token, type };

        return await verifyMailToken(request);
      } catch (error) {
        const apiError = parseApiError(error);

        setSubmitError(
          apiError?.message ?? 'Something went wrong. Please try again later.',
        );

        return null;
      }
    },
    [verifyMailToken],
  );

  return {
    submit,
    isLoading,
    submitError,
  };
};
