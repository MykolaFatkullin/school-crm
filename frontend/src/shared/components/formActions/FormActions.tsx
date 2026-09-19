import React from 'react';
import styles from './FormActions.module.scss';
type Props = {
  children: React.ReactNode;
};

export const FormActions = ({ children }: Props) => (
  <div className={styles.actions}>{children}</div>
);
