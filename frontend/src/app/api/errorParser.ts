import { ApiError } from '../model';

export const parseApiError = (error: unknown) => {
  const errorData = (error as { data?: unknown } | null)?.data;

  if (!errorData) return null;

  if (typeof errorData === 'string') {
    try {
      return JSON.parse(errorData) as ApiError;
    } catch {
      return null;
    }
  }

  return errorData as ApiError;
};
