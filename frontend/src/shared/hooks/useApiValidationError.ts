import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { useEffect } from 'react';
import { parseApiError } from '../../app/api/error';
import { ErrorCode } from '../../app/model/ErrorCode';

export const useApiValidationError = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  onFirstError?: (field: Path<T>) => void,
) => {
  useEffect(() => {
    const apiError = parseApiError(error);

    if (apiError?.errorType !== ErrorCode.VALIDATION_ERROR) {
      return;
    }

    const firstError = apiError.fieldErrors?.[0];

    if (firstError && onFirstError) {
      onFirstError(firstError.field as Path<T>);
    }

    apiError.fieldErrors?.forEach(({ field, message }) => {
      setError(field as Path<T>, {
        type: 'server',
        message,
      });
    });
  }, [error, setError, onFirstError]);
};
