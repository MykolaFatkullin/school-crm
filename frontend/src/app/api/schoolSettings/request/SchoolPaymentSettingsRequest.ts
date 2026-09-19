export interface SchoolPaymentSettingsRequest {
  apiKey?: string | null;
  secretKey?: string | null;
  currency: string;
  taxRatePercentage: number;
  invoicePrefix: string;
  defaultPaymentDueDays: number;
}
