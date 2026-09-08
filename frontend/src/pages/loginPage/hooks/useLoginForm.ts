import { LoginForm } from '../model';
import { useLoginMutation } from '../../../app/api';
import { useApiValidationError } from '../../../shared/hooks';
import { UseFormReturn } from 'react-hook-form';
import { parseApiError } from '../../../app/api/error';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { useLazyMeQuery } from '../../../app/api/account/accountApi';
import { setAuthenticated } from '../../../app/store/authSlice';
import { useDispatch } from 'react-redux';
import { useLazyGetMetaQuery } from '../../../app/api/notifications/notificationsApi';
import { setUnreadCount } from '../../../app/store/notificationsSlice';

export const useLoginForm = (methods: UseFormReturn<LoginForm>) => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [me, { isLoading: isMeLoading, error: meError }] = useLazyMeQuery();
  const [getNotificationsMeta, { isLoading: isNotificationsMetaLoading }] =
    useLazyGetMetaQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useApiValidationError(error, methods.setError);

  const apiError = parseApiError(error);

  const submit = async (form: LoginForm) => {
    const request = { email: form.email, password: form.password };

    await login(request).unwrap();

    await me().unwrap();
    const meta = await getNotificationsMeta().unwrap();

    dispatch(setAuthenticated());
    dispatch(setUnreadCount(meta.unreadNotificationsCount ?? 0));

    navigate(ROUTES.DASHBOARD);
  };

  return {
    submit,
    isLoading,
    isMeLoading,
    isNotificationsMetaLoading,
    apiError,
    meError,
  };
};
