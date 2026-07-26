import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

export const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayoutContent}>
        <Outlet />
      </div>
    </div>
  );
};
