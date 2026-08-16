import { VerifyTokenRequest } from '../../api/auth/request';
import { useResendMailByTokenMutation } from '../../api';

export const useResendMailByToken = () => {
  const [verifyMailByToken, verifyState] = useResendMailByTokenMutation();

  const verifyMail = async (request: VerifyTokenRequest) => {
    return await verifyMailByToken(request).unwrap();
  };

  return {
    verifyMail,
    isLoading: verifyState.isLoading,
  };
};
