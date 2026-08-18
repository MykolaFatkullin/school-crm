import { CircleAlert } from 'lucide-react';
import styles from './Alert.module.scss';

type Props = {
  message?: string;
};

export const Alert = ({ message }: Props) => {
  return (
    <div className={styles.alert}>
      <span className={styles.alertIcon}>
        <CircleAlert size={20} />
      </span>
      <span className={styles.alertMessage}>{message}</span>
    </div>
  );
};
