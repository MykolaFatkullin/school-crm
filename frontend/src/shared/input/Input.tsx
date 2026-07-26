import styles from './Input.module.scss';
import classNames from 'classnames';
import React, { forwardRef, Ref } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef(
  ({ label, error, ...inputProps }: Props, ref: Ref<HTMLInputElement>) => {
    const isError = error;

    return (
      <div className={styles.inputData}>
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
        <input
          {...inputProps}
          id={label}
          className={classNames(styles.input, {
            [styles.inputError]: isError,
            [styles.inputDisabled]: inputProps.disabled,
          })}
          ref={ref}
        />
        <span
          className={classNames(styles.errorText, {
            [styles.errorTextHidden]: !isError,
          })}
        >
          {error}
        </span>
      </div>
    );
  },
);
