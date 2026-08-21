import { useResendMailByToken } from '../../../../app/hooks/auth/useResendMailByToken';
import { parseApiError } from '../../../../app/api';
import { useState } from 'react';

export const useResendMail = () => {
  const { verifyMail, isLoading } = useResendMailByToken();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resendMail = async (token: string) => {
    try {
      await verifyMail({ token: token });
    } catch (error) {
      const apiError = parseApiError(error);

      setSubmitError(
        apiError?.message || 'Something went wrong. Please try again later.',
      );
    }
  };

  return {
    resendMail,
    isLoading,
    submitError,
  };
};
