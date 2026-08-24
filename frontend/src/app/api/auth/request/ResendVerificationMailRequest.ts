import { MailType } from './MailType';

export interface ResendVerificationMailRequest {
  email: string;
  type: MailType;
}
