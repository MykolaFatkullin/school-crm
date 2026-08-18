import { MailTokenRequest } from '../../api/auth/request';
import { useResendMailByTokenMutation } from '../../api';

export const useResendMailByToken = () => {
  const [verifyMailByToken, verifyState] = useResendMailByTokenMutation();

  const verifyMail = async (request: MailTokenRequest) => {
    return await verifyMailByToken(request).unwrap();
  };

  return {
    verifyMail,
    isLoading: verifyState.isLoading,
  };
};
