import { UseFormReturn } from 'react-hook-form';
import { RegisterForm } from '../model';
import { useRegister } from '../../../app/hooks/auth';
import { mapRegisterFormToRequest } from '../../../app/api/auth';
import { getStepByField } from './registrationSteps';
import { parseApiError } from '../../../app/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { useState } from 'react';

export const useRegistrationForm = (
  methods: UseFormReturn<RegisterForm>,
  goToStep: (step: number) => void,
) => {
  const { register, isLoading } = useRegister();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = async (form: RegisterForm) => {
    try {
      setSubmitError(null);

      const request = mapRegisterFormToRequest(form);

      const response = await register(request);

      navigate(ROUTES.SUCCESS_REGISTRATION, {
        state: { email: response.email },
      });
    } catch (error) {
      const apiError = parseApiError(error);

      const firstError = apiError?.fieldErrors?.[0];

      if (firstError) {
        goToStep(getStepByField(firstError.field as keyof RegisterForm));
        apiError.fieldErrors?.forEach(fieldError => {
          methods.setError(fieldError.field as keyof RegisterForm, {
            message: fieldError.message,
          });
        });

        return;
      }

      setSubmitError(
        apiError?.message ?? 'Something went wrong. Please try again later.',
      );
    }
  };

  return {
    submit,
    isLoading,
    submitError,
  };
};
