import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useApiValidationError } from '../../../shared/hooks';
import { UseFormReturn } from 'react-hook-form';
import { ChangePasswordForm } from '../model';
import { useChangeAccountPasswordMutation } from '../../../app/api/account/accountApi';
import { setUnauthenticated } from '../../../app/store/authSlice';
import { baseApi } from '../../../app/api/baseApi';
import { ROUTES } from '../../../shared/config';
import { parseApiError } from '../../../app/api/error';
import { toast } from '../../../shared/components/toast';

export const useChangePasswordForm = (
  methods: UseFormReturn<ChangePasswordForm>,
) => {
  const [changePassword, { isLoading, error }] =
    useChangeAccountPasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useApiValidationError(error, methods.setError);

  const apiError = parseApiError(error);

  const submit = async (form: ChangePasswordForm) => {
    const request = {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    };

    await changePassword(request).unwrap();

    toast.success(
      'Password changed',
      'Please sign in again with your new password.',
    );

    dispatch(setUnauthenticated());
    navigate(ROUTES.HOME);
    dispatch(baseApi.util.resetApiState());
  };

  return {
    submit,
    isLoading,
    apiError,
  };
};
