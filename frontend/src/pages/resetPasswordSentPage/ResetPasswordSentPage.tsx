import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthStepActions } from '../../shared/components/authStepActions';
import { Button } from '../../shared/components/button';
import { ROUTES } from '../../shared/config';
import { Icon } from '../../shared/components/icons';
import { Mail } from 'lucide-react';
import style from './ResetPasswordSentPage.module.scss';
import { useResendingEmail } from '../../shared/hooks';
import { MailType } from '../../app/api/auth/request';
import { useState } from 'react';
import { Alert } from '../../shared/components/alert';

export const ResetPasswordSentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { resendEmail, isLoading } = useResendingEmail();

  if (state?.success === undefined || state?.email === undefined) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const resendEmailHandler = async () => {
    const error = await resendEmail(state.email, MailType.RESET_PASSWORD);

    if (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className={style.container}>
        <Icon
          icon={Mail}
          size={22}
          withBackground={true}
          backgroundType={'ellipse'}
          className={style.iconMail}
        />
        {error && <Alert message={error} />}
        <h1 className={style.title}>Check your email</h1>
        <div className={style.textContainer}>
          <span className={style.text}>
            If an account with this email exists, we've sent a password reset
            link.
          </span>
          <div className={style.additionalText}>
            <span className={style.text}>Didn't receive the email?</span>
            <span className={style.text}>
              Check your spam folder or request another email.
            </span>
          </div>
        </div>
      </div>
      <AuthStepActions>
        <Button
          variant={'primary'}
          onClick={() => {
            navigate(ROUTES.LOGIN);
          }}
          disabled={isLoading}
        >
          Back to Login
        </Button>
        <Button
          variant={'text'}
          onClick={resendEmailHandler}
          isLoading={isLoading}
        >
          Resend Email
        </Button>
      </AuthStepActions>
    </>
  );
};
