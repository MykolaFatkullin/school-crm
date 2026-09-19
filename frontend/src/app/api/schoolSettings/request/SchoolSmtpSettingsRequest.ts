export type SMTPEncryption = 'NONE' | 'STARTTLS' | 'IMPLICIT_TLS';

export interface SchoolSmtpSettingsRequest {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword?: string | null;
  encryption: SMTPEncryption;
  fromEmail: string;
  fromName: string;
}
