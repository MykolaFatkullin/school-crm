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
  inlineText?: string;
  containerClassName?: string;
}

export const Button = ({
  disabled,
  isLoading,
  variant,
  children,
  inlineText,
  containerClassName,
  ...buttonProps
}: Props) => {
  return (
    <div className={classNames(styles.buttonContainer, containerClassName)}>
      {inlineText && (variant === 'defaultText' || variant === 'text') && (
        <span className={styles.inlineText}>{inlineText}</span>
      )}
      <button
        {...buttonProps}
        className={classNames(styles.button, styles[variant])}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <LoaderCircle className={styles.spinner} size={18} />
        ) : (
          children
        )}
      </button>
    </div>
  );
};
