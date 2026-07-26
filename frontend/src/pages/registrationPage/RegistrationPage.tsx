import { FormProvider, useForm } from 'react-hook-form';
import { Logo } from '../../shared/Logo';
import { RegisterForm } from './RegisterForm.type';
import { useState } from 'react';
import { SchoolInfoStep } from './components';
import styles from './RegistrationPage.module.scss';

const registerSteps = [
  {
    stepNumber: 1,
    title: 'Create your school',
    description: 'Set up workspace in minutes',
  },
  {
    stepNumber: 2,
    title: 'Create your password',
    description: 'Secure your school account',
  },
];

export const RegistrationPage = () => {
  const [step, setStep] = useState(0);

  const methods = useForm<RegisterForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const clearInputError = (name: keyof RegisterForm) => {
    if (methods.formState.errors[name]) {
      methods.clearErrors(name);
    }
  };

  return (
    <>
      <div className={styles.registrationPageHeader}>
        <Logo />
        <p className={styles.registrationPageHeaderStep}>
          Step {registerSteps[step].stepNumber} of 2
        </p>
        <div className={styles.registrationPageHeaderTitles}>
          <h1 className={styles.registrationPageHeaderTitle}>
            {registerSteps[step].title}
          </h1>
          <p className={styles.registrationPageHeaderDescription}>
            {registerSteps[step].description}
          </p>
        </div>
      </div>
      <FormProvider {...methods}>
        <form
          className={styles.registrationPageForm}
          onSubmit={methods.handleSubmit(() => {
            if (step === 0) {
              setStep(1);
            } else {
              console.log('Submit');
            }
          })}
        >
          {step === 0 && <SchoolInfoStep clearInputError={clearInputError} />}
          {step === 1 && <div>Step 2</div>}
        </form>
      </FormProvider>
    </>
  );
};
