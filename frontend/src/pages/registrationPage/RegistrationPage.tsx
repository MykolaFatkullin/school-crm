import { FormProvider } from 'react-hook-form';
import { RegisterForm } from './model';
import { useState } from 'react';
import { AccountCredentialsStep, SchoolInfoStep } from './components';
import { useRegistrationForm } from './hooks/useRegistrationForm';
import { MAX_STEPS, registerSteps } from './hooks/registrationSteps';
import { AuthHeader } from '../../shared/components/authHeader';
import { Form } from '../../shared/components/form';
import { useAppForm } from '../../shared/hooks';

export const RegistrationPage = () => {
  const [step, setStep] = useState(0);
  const formMethods = useAppForm<RegisterForm>();
  const { submit, isLoading } = useRegistrationForm(formMethods, setStep);

  const renderCurrentStep = (step: number) => {
    switch (step) {
      case 0:
        return <SchoolInfoStep />;
      case 1:
        return (
          <AccountCredentialsStep
            backToPreviousStep={() => setStep(0)}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AuthHeader
        header={registerSteps[step].title}
        subHeader={registerSteps[step].description}
        additionalInfo={`Step ${registerSteps[step].stepNumber} of ${MAX_STEPS}`}
      />
      <FormProvider {...formMethods}>
        <Form
          onSubmit={formMethods.handleSubmit(form => {
            if (step === MAX_STEPS - 1) {
              void submit(form);
            } else setStep(step + 1);
          })}
        >
          {renderCurrentStep(step)}
        </Form>
      </FormProvider>
    </>
  );
};
