import { Icon } from '../icons';
import { ArrowLeft, Link2Off } from 'lucide-react';
import { Button } from '../button';
import styles from './FailedVerification.module.scss';
import { MailVerificationResult } from '../../../app/api/auth/response';
import { ROUTES } from '../../config';
import { Link } from '../link';
import { useResendMailByTokenMutation } from '../../../app/api';

type Props = {
  verificationResult?: MailVerificationResult | null;
  token?: string;
};

const getTitle = (verificationResult?: MailVerificationResult | null) => {
  if (verificationResult === MailVerificationResult.EXPIRED) {
    return 'Verification link is no longer valid';
  }

  return 'Verification failed';
};

const getText = (verificationResult?: MailVerificationResult | null) => {
  if (verificationResult === MailVerificationResult.EXPIRED) {
    return 'This verification link has expired, is invalid, or has already been used. Request a new verification email to continue setting up your account.';
  }

  if (verificationResult === MailVerificationResult.ALREADY_VERIFIED) {
    return 'This email has already been verified. Please log in to continue.';
  }

  return 'This verification link has expired, is invalid, or has already been used.';
};

export const FailedVerification = ({ verificationResult, token }: Props) => {
  const [resendMail, { isLoading }] = useResendMailByTokenMutation();
  const shouldShowResendEmailButton =
    verificationResult === MailVerificationResult.EXPIRED && token;
  const title = getTitle(verificationResult);
  const text = getText(verificationResult);

  return (
    <>
      <div className={styles.container}>
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
              onClick={() => void resendMail({ token })}
            >
              Send new verification email
            </Button>
          )}
          <Link to={ROUTES.LOGIN} type={'defaultText'}>
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>
      </div>
    </>
  );
};
