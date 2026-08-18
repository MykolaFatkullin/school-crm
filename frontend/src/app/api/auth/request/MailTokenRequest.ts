import { MailType } from './MailType';

export interface MailTokenRequest {
  token: string;
  type: MailType;
}
