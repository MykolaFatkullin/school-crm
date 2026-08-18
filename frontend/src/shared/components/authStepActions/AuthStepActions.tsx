import styles from './AuthStepActions.module.scss';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AuthStepActions = ({ children }: Props) => {
  return <div className={styles.registrationStepActions}>{children}</div>;
};
