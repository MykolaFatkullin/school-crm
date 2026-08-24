import { ErrorCode } from './ErrorCode';
import { FieldError } from './FieldError';

export interface ApiError {
  message: string;
  errorType: ErrorCode;
  fieldErrors?: FieldError[];
}
