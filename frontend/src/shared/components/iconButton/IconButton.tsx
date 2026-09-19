import styles from './IconButton.module.scss';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const IconButton = ({ children, ...buttonProps }: Props) => {
  return (
    <button {...buttonProps} className={styles.iconButton}>
      {children}
    </button>
  );
};
