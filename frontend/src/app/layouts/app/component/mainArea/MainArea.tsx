import React from 'react';
import { MainAreaHeader } from '../mainAreaHeader';
import styles from './MainArea.module.scss';

type Props = {
  children: React.ReactNode;
};

export const MainArea = ({ children }: Props) => (
  <main>
    <MainAreaHeader />
    <div className={styles.mainAreaContentContainer}>{children}</div>
  </main>
);
