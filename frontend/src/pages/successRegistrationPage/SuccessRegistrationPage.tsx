import { Button } from '../../shared/components/button';
import { ArrowLeft, Mail } from 'lucide-react';
import style from './SuccessRegistration.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/config';
import { useEffect } from 'react';
import { Icon } from '../../shared/components/icons';
import { MailType } from '../../app/api/auth/request';
import { useResendVerificationMailMutation } from '../../app/api';
import { Link } from '../../shared/components/link';

type SuccessRegistrationState = {
  email?: string;
};

export const SuccessRegistrationPage = () => {
  const [resend, { isLoading }] = useResendVerificationMailMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = (location.state as SuccessRegistrationState) ?? {};

  useEffect(() => {
    if (!email) {
      navigate(ROUTES.LOGIN);
    }
  }, [email, navigate]);

  const resendEmailHandler = async () => {
    if (!email) return;

    void resend({ email, type: MailType.REGISTRATION });
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
        <Link to={ROUTES.LOGIN} type={'defaultText'}>
          <ArrowLeft size={18} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};
