import { useRegisterMutation } from '../../api';
import { RegistrationRequest } from '../../api/auth/request';

export const useRegister = () => {
  const [registerMutation, registerState] = useRegisterMutation();

  const register = async (request: RegistrationRequest) => {
    return await registerMutation(request).unwrap();
  };

  return {
    register,
    isLoading: registerState.isLoading,
  };
};
