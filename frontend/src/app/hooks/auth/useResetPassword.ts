import { useResetPasswordMutation } from '../../api';
import { ResetPasswordRequest } from '../../api/auth/request';

export const useResetPassword = () => {
  const [resetPassword, resetState] = useResetPasswordMutation();

  const reset = async (request: ResetPasswordRequest) => {
    return await resetPassword(request).unwrap();
  };

  return {
    reset,
    isLoading: resetState.isLoading,
  };
};
