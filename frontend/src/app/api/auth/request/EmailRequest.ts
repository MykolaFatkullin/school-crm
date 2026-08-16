import { MailType } from './MailType';

export interface EmailRequest {
  email: string;
  mailType: MailType;
}
