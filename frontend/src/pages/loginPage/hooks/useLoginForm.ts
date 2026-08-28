import { LoginForm } from '../model';
import { useLoginMutation } from '../../../app/api';
import { useApiValidationError } from '../../../shared/hooks';
import { UseFormReturn } from 'react-hook-form';
import { parseApiError } from '../../../app/api/error';

export const useLoginForm = (methods: UseFormReturn<LoginForm>) => {
  const [login, { isLoading, error }] = useLoginMutation();

  useApiValidationError(error, methods.setError);

  const apiError = parseApiError(error);

  const submit = async (form: LoginForm) => {
    const request = { email: form.email, password: form.password };

    await login(request).unwrap();
  };

  return {
    submit,
    isLoading,
    apiError,
  };
};
