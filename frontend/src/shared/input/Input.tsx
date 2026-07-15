import styles from './Input.module.scss';
import classNames from 'classnames';
import { HTMLInputTypeAttribute } from 'react';

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  type?: HTMLInputTypeAttribute;
};

export const Input = ({
  label,
  value,
  placeholder,
  disabled,
  error,
  type,
}: Props) => {
  const isError = !!error;
  return (
    <div className={styles.inputData}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <input
        id={label}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        typeof={type}
        className={classNames(styles.input, {
          [styles.inputError]: isError,
          [styles.inputDisabled]: disabled,
        })}
      />
      {isError && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
