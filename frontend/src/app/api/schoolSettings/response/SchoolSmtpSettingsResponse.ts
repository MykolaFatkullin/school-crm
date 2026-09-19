export interface SchoolSmtpSettingsResponse {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPasswordConfigured: boolean;
  encryption: string;
  fromEmail: string;
  fromName: string;
}
