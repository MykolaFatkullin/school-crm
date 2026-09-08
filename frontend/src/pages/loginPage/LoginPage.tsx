import {
  createEmailValidation,
  createPasswordValidation,
  ROUTES,
} from '../../shared/config';
import { LoginForm } from './model';
import { useLoginForm } from './hooks';
import { useAppForm } from '../../shared/hooks';
import { AuthHeader } from '../../shared/components/authHeader';
import { ErrorCode } from '../../app/model/ErrorCode';
import { Alert } from '../../shared/components/alert';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';
import { Link } from '../../shared/components/link';
import { AuthStepActions } from '../../shared/components/authStepActions';
import { Button } from '../../shared/components/button';

export const LoginPage = () => {
  const formMethods = useAppForm<LoginForm>();
  const {
    submit,
    isLoading,
    isMeLoading,
    isNotificationsMetaLoading,
    apiError,
    meError,
  } = useLoginForm(formMethods);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const email = register('email', createEmailValidation());

  const password = register('password', createPasswordValidation());

  const onSubmit = (data: LoginForm) => {
    void submit(data);
  };

  const isSubmitting = isLoading || isMeLoading || isNotificationsMetaLoading;

  return (
    <main>
      <AuthHeader
        header={'Welcome back'}
        subHeader={'Sign in to your account'}
      />
      {apiError && !meError && apiError.errorType === ErrorCode.AUTH_ERROR && (
        <Alert message={'Incorrect email or password'} />
      )}
      {meError && (
        <Alert message={'Something went wrong. Please try again later.'} />
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...email}
          label={'Email'}
          error={errors.email?.message}
          placeholder={'Enter your email'}
        />
        <Input
          {...password}
          type={'password'}
          label={'Password'}
          error={errors.password?.message}
          placeholder={'Enter your password'}
        />
        <Link
          type={'primaryText'}
          to={ROUTES.RESET_PASSWORD}
          position={'right'}
        >
          Forgot password?
        </Link>
        <AuthStepActions>
          <Button variant={'primary'} type={'submit'} isLoading={isSubmitting}>
            Log in
          </Button>
          <Link
            to={ROUTES.REGISTRATION}
            type={'primaryText'}
            inlineText={"Don't have a school yet?"}
          >
            Create School
          </Link>
        </AuthStepActions>
      </Form>
    </main>
  );
};
