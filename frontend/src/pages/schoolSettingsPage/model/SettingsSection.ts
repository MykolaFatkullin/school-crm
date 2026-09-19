export type SettingsSection = 'school-information' | 'payment' | 'smtp';

export const SettingsSections = [
  {
    id: 'school-information',
    label: 'School Information',
  },
  {
    id: 'payment',
    label: 'Payment',
  },
  {
    id: 'smtp',
    label: 'SMTP / Email',
  },
] as const;
