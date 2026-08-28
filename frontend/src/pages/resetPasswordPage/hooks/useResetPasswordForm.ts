import { ResetPasswordForm } from '../model';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { useResetPasswordMutation } from '../../../app/api';

export const useResetPasswordForm = () => {
  const [reset, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const resetPassword = async (form: ResetPasswordForm) => {
    const request = { email: form.email };

    await reset(request).unwrap();

    navigate(ROUTES.RESET_PASSWORD_SENT, {
      replace: true,
      state: { success: true, email: form.email },
    });
  };

  return {
    resetPassword,
    isLoading,
  };
};
