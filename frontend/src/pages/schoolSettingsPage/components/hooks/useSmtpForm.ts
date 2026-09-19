import { UseFormReturn } from 'react-hook-form';
import { useApiValidationError } from '../../../../shared/hooks';
import { parseApiError } from '../../../../app/api/error';
import { toast } from '../../../../shared/components/toast';
import { SchoolSmtpSettingsRequest } from '../../../../app/api/schoolSettings/request';
import { useUpdateSmtpSettingsMutation } from '../../../../app/api/schoolSettings/schoolSettingsApi';

export const useSmtpForm = (
  methods: UseFormReturn<SchoolSmtpSettingsRequest>,
) => {
  const [updateSmtp, { isLoading, error }] = useUpdateSmtpSettingsMutation();

  useApiValidationError(error, methods.setError);
  const apiError = parseApiError(error);

  const update = async (settings: SchoolSmtpSettingsRequest) => {
    await updateSmtp(settings).unwrap();

    toast.success('SMTP settings updated successfully');
  };

  return {
    update,
    isLoading,
    apiError,
  };
};
