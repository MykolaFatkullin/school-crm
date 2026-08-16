import { Icon } from '../icons';
import { ArrowLeft, Link2Off } from 'lucide-react';
import { Button } from '../button';
import styles from './FailedVerification.module.scss';
import { MailVerificationResult } from '../../../app/api/auth/response';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config';
import { useResendMail } from './hooks';
import { MailType } from '../../../app/api/auth/request';
import { Alert } from '../alert';

type Props = {
  verificationResult: MailVerificationResult;
  token?: string;
  type: MailType;
};

const getTitle = (verificationResult: MailVerificationResult) => {
  if (verificationResult === 'EXPIRED') {
    return 'Verification link is no longer valid';
  }

  return 'Verification failed';
};

const getText = (verificationResult: MailVerificationResult) => {
  if (verificationResult === 'EXPIRED') {
    return 'This verification link has expired, is invalid, or has already been used. Request a new verification email to continue setting up your account.';
  }

  if (verificationResult === 'ALREADY_VERIFIED') {
    return 'This email has already been verified. Please log in to continue.';
  }

  return 'This verification link has expired, is invalid, or has already been used.';
};

export const FailedVerification = ({
  verificationResult,
  token,
  type,
}: Props) => {
  const navigate = useNavigate();
  const { resendMail, isLoading, submitError } = useResendMail();
  const shouldShowResendEmailButton = verificationResult === 'EXPIRED' && token;
  const title = getTitle(verificationResult);
  const text = getText(verificationResult);

  return (
    <>
      <div className={styles.container}>
        {submitError && <Alert message={submitError} />}
        <div className={styles.content}>
          <Icon
            icon={Link2Off}
            withBackground={true}
            backgroundType={'ellipse'}
            size={22}
            className={styles.icon}
          />
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.text}>{text}</span>
        </div>
        <div className={styles.buttons}>
          {shouldShowResendEmailButton && (
            <Button
              variant={'primary'}
              isLoading={isLoading}
              onClick={() => resendMail(token, type)}
            >
              Send new verification email
            </Button>
          )}
          <Button
            variant={'defaultText'}
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            <ArrowLeft size={18} />
            Back to Login
          </Button>
        </div>
      </div>
    </>
  );
};
