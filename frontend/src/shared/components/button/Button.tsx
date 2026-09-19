import styles from './Button.module.scss';
import classNames from 'classnames';
import React from 'react';
import { ButtonType } from './ButtonType';
import { LoaderCircle } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  isLoading?: boolean;
  variant: ButtonType;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  disabled,
  isLoading,
  variant,
  children,
  fullWidth = true,
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      className={classNames(
        styles.button,
        styles[variant],
        !fullWidth && styles.notFullWidth,
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <LoaderCircle className={styles.spinner} size={18} />
      ) : (
        children
      )}
    </button>
  );
};
