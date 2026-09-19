export interface SchoolPaymentSettingsResponse {
  apiKeyConfigured: boolean;
  secretKeyConfigured: boolean;
  currency: string;
  taxRatePercentage: number;
  invoicePrefix: string;
  defaultPaymentDueDays: number;
}
