import { useVerifyMailTokenMutation } from '../../api';
import { VerifyTokenRequest } from '../../api/auth/request';

export const useVerifyMailToken = () => {
  const [verifyMailTokenMutation, verifyState] = useVerifyMailTokenMutation();

  const verifyMailToken = async (request: VerifyTokenRequest) => {
    return await verifyMailTokenMutation(request).unwrap();
  };

  return {
    verifyMailToken,
    isLoading: verifyState.isLoading,
  };
};
