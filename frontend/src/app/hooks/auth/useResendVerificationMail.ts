import { useResendVerificationMailMutation } from '../../api';
import { ResendVerificationMailRequest } from '../../api/auth/request';

export const useResendVerificationMail = () => {
  const [resendVerificationMailMutation, resendState] =
    useResendVerificationMailMutation();

  const resendVerificationMail = async (
    request: ResendVerificationMailRequest,
  ) => {
    return await resendVerificationMailMutation(request).unwrap();
  };

  return {
    resendVerificationMail,
    isLoading: resendState.isLoading,
  };
};
