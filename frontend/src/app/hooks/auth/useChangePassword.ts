import { useChangePasswordMutation } from '../../api';
import { ChangePasswordRequest } from '../../api/auth/request/ChangePasswordRequest';

export const useChangePassword = () => {
  const [changePasswordMutation, changePasswordState] =
    useChangePasswordMutation();

  const change = async (request: ChangePasswordRequest) => {
    return await changePasswordMutation(request).unwrap();
  };

  return {
    change,
    isLoading: changePasswordState.isLoading,
  };
};
