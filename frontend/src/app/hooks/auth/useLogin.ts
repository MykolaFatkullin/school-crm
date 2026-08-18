import { useLoginMutation } from '../../api';
import { LoginRequest } from '../../api/auth/request';

export const useLogin = () => {
  const [loginMutation, loginState] = useLoginMutation();

  const login = async (request: LoginRequest) => {
    return await loginMutation(request).unwrap();
  };

  return {
    login,
    isLoading: loginState.isLoading,
  };
};
