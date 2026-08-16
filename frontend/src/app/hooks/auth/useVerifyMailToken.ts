import { useVerifyMailTokenMutation } from '../../api';
import { MailTokenRequest } from '../../api/auth/request';

export const useVerifyMailToken = () => {
  const [verifyMailTokenMutation, verifyState] = useVerifyMailTokenMutation();

  const verifyMailToken = async (request: MailTokenRequest) => {
    return await verifyMailTokenMutation(request).unwrap();
  };

  return {
    verifyMailToken,
    isLoading: verifyState.isLoading,
  };
};
