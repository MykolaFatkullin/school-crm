import { useResendVerificationMail } from '../../app/hooks/auth';
import { parseApiError } from '../../app/api';
import { MailType } from '../../app/api/auth/request';

export const useResendingEmail = () => {
  const { resendVerificationMail, isLoading } = useResendVerificationMail();

  const resendEmail = async (email: string, type: MailType) => {
    try {
      const request = { email, type };

      await resendVerificationMail(request);
    } catch (error) {
      return parseApiError(error);
    }
  };

  return {
    resendEmail,
    isLoading,
  };
};
