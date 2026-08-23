import styles from './Input.module.scss';
import classNames from 'classnames';
import React, { forwardRef, useId, Ref } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  additionalText?: string;
}

export const Input = forwardRef(
  (
    { label, error, additionalText, ...inputProps }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    const generatedId = useId();
    const isError = error;

    return (
      <div className={styles.inputData}>
        <label htmlFor={generatedId} className={styles.label}>
          {label}
        </label>
        <input
          {...inputProps}
          id={generatedId}
          className={classNames(styles.input, {
            [styles.inputError]: isError,
            [styles.inputDisabled]: inputProps.disabled,
          })}
          ref={ref}
        />
        <span
          className={classNames(styles.messageText, {
            [styles.messageError]: isError,
            [styles.textHidden]: !isError && !additionalText,
          })}
        >
          {isError ? error : additionalText || '\u00A0'}
        </span>
      </div>
    );
  },
);
