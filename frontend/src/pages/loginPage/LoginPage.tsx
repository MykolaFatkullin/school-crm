import { Button } from '../../shared/components/button';
import {
  createEmailValidation,
  createPasswordValidation,
  ROUTES,
} from '../../shared/config';
import { Input } from '../../shared/components/input';
import { LoginForm } from './model';
import { AuthStepActions } from '../../shared/components/authStepActions';
import { useLoginForm } from './hooks';
import { AuthHeader } from '../../shared/components/authHeader';
import { Form } from '../../shared/components/form';
import { useAppForm } from '../../shared/hooks';
import { Link } from '../../shared/components/link';
import { ErrorCode } from '../../app/model/ErrorCode';
import { Alert } from '../../shared/components/alert';

export const LoginPage = () => {
  const formMethods = useAppForm<LoginForm>();
  const { submit, isLoading, apiError } = useLoginForm(formMethods);

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

  return (
    <>
      <AuthHeader
        header={'Welcome back'}
        subHeader={'Sign in to your account'}
      />
      {apiError && apiError.errorType === ErrorCode.AUTH_ERROR && (
        <Alert message={'Incorrect email or password'} />
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
          <Button variant={'primary'} type={'submit'} isLoading={isLoading}>
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
    </>
  );
};
