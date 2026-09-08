import styles from './AuthHeader.module.scss';
import { Logo } from '../icons';

type Props = {
  header: string;
  subHeader: string;
  additionalInfo?: string;
};

export const AuthHeader = ({ header, subHeader, additionalInfo }: Props) => {
  return (
    <header className={styles.authHeader}>
      <Logo />
      {additionalInfo && (
        <p className={styles.authHeaderStep}>{additionalInfo}</p>
      )}
      <div className={styles.authHeaderTitles}>
        <h1 className={styles.authHeaderTitle}>{header}</h1>
        <p className={styles.authHeaderDescription}>{subHeader}</p>
      </div>
    </header>
  );
};
