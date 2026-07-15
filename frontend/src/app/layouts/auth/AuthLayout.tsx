import { Outlet } from 'react-router-dom';
import { AuthLayoutContext } from './AuthContext';
import { useState } from 'react';
import styles from './AuthLayout.module.scss';

export const AuthLayout = () => {
  const [title, setTitle] = useState('Welcome to SchoolCRM');

  return (
    <AuthLayoutContext.Provider value={{ title, setTitle }}>
      <div className={styles.authLayout}>
       <div>
       </div>
        <h1 className={styles.authLayoutTitle}>{title}</h1>
        <div className={styles.authLayoutContent}>
          <Outlet />
        </div>
      </div>
    </AuthLayoutContext.Provider>
  );
};
