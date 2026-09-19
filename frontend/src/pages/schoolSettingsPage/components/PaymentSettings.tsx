import { Form } from '../../../shared/components/form';
import { Input } from '../../../shared/components/input';
import { useAppForm } from '../../../shared/hooks';
import { SchoolPaymentSettingsRequest } from '../../../app/api/schoolSettings/request';
import styles from './PaymentSettings.module.scss';
import {
  createNonEmptyValidation,
  createNonNegativeDecimalValidation,
  createNonNegativeIntegerValidation,
} from '../../../shared/config/formValidation';
import { Select } from '../../../shared/components/select';
import { Controller } from 'react-hook-form';
import { Button } from '../../../shared/components/button';
import { FormActions } from '../../../shared/components/formActions';
import { useGetPaymentSettingsQuery } from '../../../app/api/schoolSettings/schoolSettingsApi';
import { usePaymentSettingsForm } from './hooks/usePaymentSettingsForm';
import { Alert } from '../../../shared/components/alert';
import { useEffect } from 'react';

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

export const PaymentSettings = () => {
  const formMethods = useAppForm<SchoolPaymentSettingsRequest>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = formMethods;
  const { data: storedSettings } = useGetPaymentSettingsQuery();
  const { update, isLoading, apiError } = usePaymentSettingsForm(formMethods);

  const apiKey = register('apiKey', {
    validate: value => {
      if (storedSettings?.apiKeyConfigured && !value) {
        return true;
      }

      return value?.trim() ? true : 'API key is required';
    },
  });

  const secretKey = register('secretKey', {
    validate: value => {
      if (storedSettings?.secretKeyConfigured && !value) {
        return true;
      }

      return value?.trim() ? true : 'Secret key is required';
    },
  });

  const taxRatePercentage = register(
    'taxRatePercentage',
    createNonNegativeDecimalValidation<
      SchoolPaymentSettingsRequest,
      'taxRatePercentage'
    >(),
  );
  const invoicePrefix = register(
    'invoicePrefix',
    createNonEmptyValidation<SchoolPaymentSettingsRequest, 'invoicePrefix'>(),
  );
  const defaultPaymentDueDays = register(
    'defaultPaymentDueDays',
    createNonNegativeIntegerValidation<
      SchoolPaymentSettingsRequest,
      'defaultPaymentDueDays'
    >(),
  );

  useEffect(() => {
    if (!storedSettings) {
      return;
    }

    reset({
      apiKey: '',
      secretKey: '',
      currency: storedSettings.currency ?? '',
      taxRatePercentage: storedSettings.taxRatePercentage ?? 0,
      invoicePrefix: storedSettings.invoicePrefix ?? '',
      defaultPaymentDueDays: storedSettings.defaultPaymentDueDays ?? 0,
    });
  }, [storedSettings, reset]);

  return (
    <Form onSubmit={handleSubmit(update)}>
      <p className={styles.paymentProvider}>Payment provider: Stripe</p>
      {apiError && (
        <Alert message={'Something went wrong. Please try again later.'} />
      )}
      <Input
        {...apiKey}
        label="Api Key"
        error={errors.apiKey?.message}
        placeholder={
          storedSettings?.apiKeyConfigured
            ? 'API key is already configured'
            : 'Enter API key'
        }
        type="password"
      />
      <Input
        {...secretKey}
        label={'Secret Key'}
        error={errors.secretKey?.message}
        placeholder={
          storedSettings?.secretKeyConfigured
            ? 'Secret key is already configured'
            : 'Enter secret key'
        }
        type={'password'}
      />
      <Controller
        control={control}
        name="currency"
        rules={{
          required: {
            value: true,
            message: 'Please choose payment currency',
          },
        }}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            label={'Default Currency'}
            placeholder={'Select a payment currency'}
            options={currencyOptions}
            error={fieldState.error?.message}
            value={field.value}
          />
        )}
      />
      <Input
        {...taxRatePercentage}
        type="number"
        step="0.01"
        min="0"
        label="Tax Rate (%)"
        error={errors.taxRatePercentage?.message}
        placeholder="Enter tax rate"
      />
      <Input
        {...invoicePrefix}
        label={'Invoice Prefix'}
        error={errors.invoicePrefix?.message}
        placeholder="Enter invoice prefix"
      />
      <Input
        {...defaultPaymentDueDays}
        type="number"
        step="1"
        min="0"
        label="Default Payment Due Days"
        error={errors.defaultPaymentDueDays?.message}
        placeholder="Enter default payment due days"
      />
      <FormActions>
        <Button
          variant={'primary'}
          type={'submit'}
          isLoading={isLoading}
          fullWidth={false}
        >
          Save Changes
        </Button>
      </FormActions>
    </Form>
  );
};
