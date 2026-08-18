import { Button } from '../../shared/components/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/config';
import { Input } from '../../shared/components/input';
import { LoginForm } from './model';
import style from './LoginPage.module.scss';
import { AuthStepActions } from '../../shared/components/authStepActions';
import { useLoginForm } from './hooks';
import { Alert } from '../../shared/components/alert';
import { AuthHeader } from '../../shared/components/authHeader';
import { Form } from '../../shared/components/form';
import { useAppForm } from '../../shared/hooks';
import {
  createEmailValidation,
  createPasswordValidation,
} from '../../shared/config';

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm<LoginForm>();
  const { submit, isLoading, submitError } = useLoginForm();

  const email = register('email', createEmailValidation());

  const password = register('password', createPasswordValidation());

  const onSubmit = (data: LoginForm) => {
    void submit(data);
  };

  return (
    <div className={style.loginPage}>
      <AuthHeader
        header={'Welcome back'}
        subHeader={'Sign in to your account'}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        {submitError && <Alert message={submitError} />}
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
        <Button
          type={'button'}
          variant={'text'}
          containerClassName={style.formForgotPassword}
          onClick={() => navigate(ROUTES.RESET_PASSWORD)}
        >
          Forgot password?
        </Button>
        <AuthStepActions>
          <Button variant={'primary'} type={'submit'} isLoading={isLoading}>
            Log in
          </Button>
          <Button
            type={'button'}
            variant={'text'}
            inlineText={"Don't have a school yet?"}
            onClick={() => navigate(ROUTES.REGISTRATION)}
            disabled={isLoading}
          >
            Create School
          </Button>
        </AuthStepActions>
      </Form>
    </div>
  );
};
