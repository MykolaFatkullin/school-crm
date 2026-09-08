import { Navigate, useLocation } from 'react-router-dom';
import { AuthStepActions } from '../../shared/components/authStepActions';
import { Button } from '../../shared/components/button';
import { ROUTES } from '../../shared/config';
import { Icon } from '../../shared/components/icons';
import { ArrowLeft, Mail } from 'lucide-react';
import style from './ResetPasswordSentPage.module.scss';
import { MailType } from '../../app/api/auth/request';
import { useResendVerificationMailMutation } from '../../app/api';
import { Link } from '../../shared/components/link';

export const ResetPasswordSentPage = () => {
  const { state } = useLocation();
  const [resendEmail, { isLoading }] = useResendVerificationMailMutation();

  if (state?.success === undefined || state?.email === undefined) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const resendEmailHandler = async () => {
    void resendEmail({
      email: state.email,
      type: MailType.RESET_PASSWORD,
    });
  };

  return (
    <main>
      <div className={style.container}>
        <Icon
          icon={Mail}
          size={22}
          withBackground={true}
          backgroundType={'ellipse'}
          className={style.iconMail}
        />
        <h1 className={style.title}>Check your email</h1>
        <div className={style.textContainer}>
          <p className={style.text}>
            If an account with this email exists, we've sent a password reset
            link.
          </p>
          <p className={style.additionalText}>
            <span className={style.text}>Didn't receive the email?</span>
            <span className={style.text}>
              Check your spam folder or request another email.
            </span>
          </p>
        </div>
      </div>
      <AuthStepActions>
        <Button
          variant={'primary'}
          onClick={resendEmailHandler}
          isLoading={isLoading}
        >
          Resend Email
        </Button>
        <Link to={ROUTES.LOGIN} type={'defaultText'}>
          <ArrowLeft size={18} />
          Back to Login
        </Link>
      </AuthStepActions>
    </main>
  );
};
