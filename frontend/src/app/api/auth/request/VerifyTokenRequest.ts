import { MailType } from './MailType';

export interface VerifyTokenRequest {
  token: string;
  type: MailType;
}
