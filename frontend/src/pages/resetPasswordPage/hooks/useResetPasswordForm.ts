import { ResetPasswordForm } from '../model';
import { useResetPassword } from '../../../app/hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { parseApiError } from '../../../app/api';
import { ROUTES } from '../../../shared/config';

export const useResetPasswordForm = () => {
  const { reset, isLoading } = useResetPassword();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetPassword = async (form: ResetPasswordForm) => {
    try {
      setSubmitError(null);

      const request = { email: form.email };

      await reset(request);

      navigate(ROUTES.RESET_PASSWORD_SENT, {
        replace: true,
        state: { success: true, email: form.email },
      });
    } catch (error) {
      const apiError = parseApiError(error);

      setSubmitError(
        apiError?.message ?? 'Something went wrong. Please try again later.',
      );
    }
  };

  return {
    resetPassword,
    isLoading,
    submitError,
  };
};
