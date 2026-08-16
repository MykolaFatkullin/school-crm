import { useChangePassword } from '../../../app/hooks/auth/useChangePassword';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { parseApiError } from '../../../app/api';
import { SetNewPasswordForm } from '../model';

export const useChangePasswordForm = () => {
  const { change, isLoading } = useChangePassword();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const changePassword = async (form: SetNewPasswordForm, token: string) => {
    try {
      const request = { password: form.password, token: token };

      await change(request);

      navigate(ROUTES.RESET_PASSWORD_RESULT, {
        replace: true,
        state: { success: true },
      });
    } catch (error) {
      const apiError = parseApiError(error);

      setSubmitError(
        apiError?.message ?? 'Something went wrong. Please try again later.',
      );
    }
  };

  return {
    changePassword,
    isLoading,
    submitError,
  };
};
