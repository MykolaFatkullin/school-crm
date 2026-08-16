import styles from './AuthHeader.module.scss';
import { Logo } from '../icons';

type Props = {
  header: string;
  subHeader: string;
  additionalInfo?: string;
};

export const AuthHeader = ({ header, subHeader, additionalInfo }: Props) => {
  return (
    <div className={styles.registrationPageHeader}>
      <Logo />
      {additionalInfo && (
        <p className={styles.registrationPageHeaderStep}>{additionalInfo}</p>
      )}
      <div className={styles.registrationPageHeaderTitles}>
        <h1 className={styles.registrationPageHeaderTitle}>{header}</h1>
        <p className={styles.registrationPageHeaderDescription}>{subHeader}</p>
      </div>
    </div>
  );
};
