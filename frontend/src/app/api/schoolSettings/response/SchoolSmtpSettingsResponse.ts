import { SMTPEncryption } from '../request';

export interface SchoolSmtpSettingsResponse {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPasswordConfigured: boolean;
  encryption: SMTPEncryption;
  fromEmail: string;
  fromName: string;
}
