import { useState } from 'react';
import { LoginForm } from '../model';
import { useLogin } from '../../../app/hooks/auth/useLogin';
import { parseApiError } from '../../../app/api';

export const useLoginForm = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { login, isLoading } = useLogin();

  const submit = async (form: LoginForm) => {
    try {
      setSubmitError(null);

      const request = { email: form.email, password: form.password };

      await login(request);
    } catch (error) {
      const apiError = parseApiError(error);

      if (apiError?.code === 'AUTH_ERROR') {
        setSubmitError(
          'Incorrect email or password, or the user is not activated.',
        );

        return;
      }

      setSubmitError('Something went wrong. Please try again later.');
    }
  };

  return {
    submit,
    isLoading,
    submitError,
  };
};
