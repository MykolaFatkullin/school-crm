import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const createEmailValidation = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  requiredMessage = 'Email must not be empty',
): RegisterOptions<TFieldValues, TFieldName> =>
  ({
    required: {
      value: true,
      message: requiredMessage,
    },
    pattern: {
      value: EMAIL_PATTERN,
      message: 'Invalid email address',
    },
  }) as RegisterOptions<TFieldValues, TFieldName>;

export const createPasswordValidation = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  message = 'Must contain at least 8 characters',
): RegisterOptions<TFieldValues, TFieldName> =>
  ({
    required: {
      value: true,
      message,
    },
    minLength: {
      value: 8,
      message,
    },
  }) as RegisterOptions<TFieldValues, TFieldName>;

export const createConfirmPasswordValidation = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  messageNotMatch = 'Passwords do not match',
): RegisterOptions<TFieldValues, TFieldName> =>
  ({
    validate: (value: string, formValues) => {
      if (value !== formValues.password) {
        return messageNotMatch;
      }

      return true;
    },
  }) as RegisterOptions<TFieldValues, TFieldName>;
