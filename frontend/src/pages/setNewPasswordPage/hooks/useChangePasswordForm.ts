import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { SetNewPasswordForm } from '../model';
import { useChangePasswordMutation } from '../../../app/api';

export const useChangePasswordForm = () => {
  const [change, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();

  const changePassword = async (form: SetNewPasswordForm, token: string) => {
    const request = { password: form.password, token: token };

    await change(request).unwrap();

    navigate(ROUTES.RESET_PASSWORD_RESULT, {
      replace: true,
      state: { success: true },
    });
  };

  return {
    changePassword,
    isLoading,
  };
};
