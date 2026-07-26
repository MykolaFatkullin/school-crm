import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonType } from './Button.types';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  onClick?: () => void;
  variant: ButtonType;
  children: React.ReactNode;
}

export const Button = ({ disabled, onClick, variant, children }: Props) => {
  return (
    <>
      <button
        className={classNames(styles.button, styles[variant])}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
