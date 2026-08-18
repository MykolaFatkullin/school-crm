import { useVerifyMailTokenMutation } from '../../api';
import { MailTokenRequest } from '../../api/auth/request';
import { useCallback } from 'react';

export const useVerifyMailToken = () => {
  const [verifyMailTokenMutation, verifyState] = useVerifyMailTokenMutation();

  const verifyMailToken = useCallback(
    async (request: MailTokenRequest) => {
      return await verifyMailTokenMutation(request).unwrap();
    },
    [verifyMailTokenMutation],
  );

  return {
    verifyMailToken,
    isLoading: verifyState.isLoading,
  };
};
