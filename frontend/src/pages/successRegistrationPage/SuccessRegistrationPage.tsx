import { Button } from '../../shared/components/button';
import { ArrowLeft, Mail } from 'lucide-react';
import style from './SuccessRegistration.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/config';
import { useEffect, useState } from 'react';
import { useResendingEmail } from '../../shared/hooks';
import { Alert } from '../../shared/components/alert';
import { Icon } from '../../shared/components/icons';
import { MailType } from '../../app/api/auth/request';

type SuccessRegistrationState = {
  email?: string;
};

export const SuccessRegistrationPage = () => {
  const navigate = useNavigate();
  const { resendEmail, isLoading } = useResendingEmail();
  const location = useLocation();
  const { email } = (location.state as SuccessRegistrationState) ?? {};
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      navigate(ROUTES.LOGIN);
    }
  });

  const resendEmailHandler = async () => {
    if (!email) return;

    const error = await resendEmail(email, MailType.REGISTRATION);

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className={style.successPage}>
      <div className={style.contentContainer}>
        <Icon
          icon={Mail}
          size={22}
          withBackground={true}
          backgroundType={'ellipse'}
          className={style.iconMail}
        />
        {error && <Alert message={error} />}
        <h1 className={style.title}>Verify your email</h1>
        <span className={style.text}>We've sent a verification link to</span>
        <span className={style.email}>{email}</span>
        <span className={style.text}>
          Please open your inbox and click the verification link before
          continuing.
        </span>
      </div>
      <div className={style.buttonContainer}>
        <Button
          variant={'primary'}
          onClick={resendEmailHandler}
          isLoading={isLoading}
        >
          Resend Email
        </Button>
        <Button
          variant={'defaultText'}
          onClick={() => {
            navigate(ROUTES.LOGIN);
          }}
          disabled={isLoading}
        >
          <ArrowLeft size={18} />
          Back to Login
        </Button>
      </div>
    </div>
  );
};
