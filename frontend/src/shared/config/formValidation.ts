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
  message = 'Must contain at least 8 characters maximum 32 characters',
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
    maxLength: {
      value: 32,
      message,
    },
  }) as RegisterOptions<TFieldValues, TFieldName>;

export const createConfirmPasswordValidation = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  fieldName: string | undefined = 'password',
  messageNotMatch = 'Passwords do not match',
): RegisterOptions<TFieldValues, TFieldName> =>
  ({
    validate: (value: string, formValues) => {
      if (value !== formValues[fieldName]) {
        return messageNotMatch;
      }

      return true;
    },
  }) as RegisterOptions<TFieldValues, TFieldName>;

export const createNonEmptyValidation = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  message = 'Please enter a value',
): RegisterOptions<TFieldValues, TFieldName> =>
  ({
    required: {
      value: true,
      message,
    },
  }) as RegisterOptions<TFieldValues, TFieldName>;

export const createNonNegativeDecimalValidation = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(): RegisterOptions<TFieldValues, TFieldName> =>
  ({
    valueAsNumber: true,
    required: {
      value: true,
      message: 'Please fill this field',
    },
    min: {
      value: 0,
      message: 'Value must be greater than or equal to 0',
    },
  }) as RegisterOptions<TFieldValues, TFieldName>;

export const createNonNegativeIntegerValidation = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(): RegisterOptions<TFieldValues, TFieldName> =>
  ({
    valueAsNumber: true,
    required: {
      value: true,
      message: 'Please fill this field',
    },
    min: {
      value: 0,
      message: 'Value must be greater than or equal to 0',
    },
    validate: value =>
      Number.isInteger(value) || 'Value must be a whole number',
  }) as RegisterOptions<TFieldValues, TFieldName>;
