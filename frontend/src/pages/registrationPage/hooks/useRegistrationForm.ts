import { UseFormReturn } from 'react-hook-form';
import { RegisterForm } from '../model';
import { mapRegisterFormToRequest } from '../../../app/api/auth';
import { getStepByField } from './registrationSteps';
import { useRegisterMutation } from '../../../app/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { useApiValidationError } from '../../../shared/hooks';

export const useRegistrationForm = (
  methods: UseFormReturn<RegisterForm>,
  goToStep: (step: number) => void,
) => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  useApiValidationError(error, methods.setError, field => {
    goToStep(getStepByField(field));
  });

  const submit = async (form: RegisterForm) => {
    const request = mapRegisterFormToRequest(form);

    const response = await register(request).unwrap();

    navigate(ROUTES.SUCCESS_REGISTRATION, {
      state: { email: response.email },
    });
  };

  return {
    submit,
    isLoading,
  };
};
