import { ErrorCode } from './ErrorCode';
import { FieldError } from './FieldError';

export interface ApiError {
  message: string;
  code: ErrorCode;
  fieldErrors?: FieldError[];
}
