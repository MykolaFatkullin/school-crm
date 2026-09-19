import { UseFormReturn } from 'react-hook-form';
import { useApiValidationError } from '../../../../shared/hooks';
import { parseApiError } from '../../../../app/api/error';
import { toast } from '../../../../shared/components/toast';
import { useUpdatePaymentSettingsMutation } from '../../../../app/api/schoolSettings/schoolSettingsApi';
import { SchoolPaymentSettingsRequest } from '../../../../app/api/schoolSettings/request';

export const usePaymentSettingsForm = (
  methods: UseFormReturn<SchoolPaymentSettingsRequest>,
) => {
  const [updatePayment, { isLoading, error }] =
    useUpdatePaymentSettingsMutation();

  useApiValidationError(error, methods.setError);
  const apiError = parseApiError(error);

  const update = async (settings: SchoolPaymentSettingsRequest) => {
    await updatePayment({
      ...settings,
      apiKey: settings.apiKey?.trim() || null,
      secretKey: settings.secretKey?.trim() || null,
    }).unwrap();

    toast.success('Payment settings updated successfully');
  };

  return {
    update,
    isLoading,
    apiError,
  };
};
