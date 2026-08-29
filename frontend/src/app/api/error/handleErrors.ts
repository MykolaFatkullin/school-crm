import { BaseQueryApi, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { parseApiError } from './errorParser';
import { setGlobalError } from '../../store/globalErrorSlice';
import { ErrorCode } from '../../model/ErrorCode';
import { toast } from '../../../shared/components/toast';

const isCriticalRequest = (url: string) => {
  return (
    url === '/me' ||
    url === '/auth/verify-mail-token' ||
    url.startsWith('/auth/resend-verification-by-token')
  );
};

const isServerError = (status: FetchBaseQueryError['status']) => {
  return status === 500 || status === 502 || status === 503 || status === 504;
};

const isNetworkError = (status: FetchBaseQueryError['status']) => {
  return (
    status === 'FETCH_ERROR' ||
    status === 'TIMEOUT_ERROR' ||
    status === 'PARSING_ERROR'
  );
};

export const handleErrors = (
  error: FetchBaseQueryError,
  api: BaseQueryApi,
  url: string,
) => {
  const apiError = parseApiError(error);

  if (isCriticalRequest(url)) {
    if (isNetworkError(error.status)) {
      api.dispatch(setGlobalError('NETWORK_ERROR'));

      return;
    }

    if (isServerError(error.status)) {
      api.dispatch(setGlobalError('SERVER_ERROR'));

      return;
    }
  }

  if (apiError) {
    switch (apiError.errorType) {
      case ErrorCode.SYSTEM_ERROR:
        toast.error(
          'Something went wrong. Please try again later.',
          apiError.message,
        );
        break;

      default:
        break;
    }

    return;
  }

  if (isNetworkError(error.status)) {
    toast.error(
      'Connection error',
      'Unable to connect to the server. Please try again.',
    );

    return;
  }

  toast.error('Something went wrong.', 'Please try again later.');
};
