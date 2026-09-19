export interface SchoolSmtpSettingsRequest {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword?: string;
  encryption: string;
  fromEmail: string;
  fromName: string;
}
