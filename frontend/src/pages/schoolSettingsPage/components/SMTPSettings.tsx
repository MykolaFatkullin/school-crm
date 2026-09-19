import { Form } from '../../../shared/components/form';
import { Input } from '../../../shared/components/input';
import { useGetSmtpSettingsQuery } from '../../../app/api/schoolSettings/schoolSettingsApi';
import { useEffect } from 'react';
import { useAppForm } from '../../../shared/hooks';
import {
  SchoolSmtpSettingsRequest,
  SMTPEncryption,
} from '../../../app/api/schoolSettings/request';
import { Select } from '../../../shared/components/select';
import { Controller } from 'react-hook-form';
import {
  createEmailValidation,
  createNonEmptyValidation,
} from '../../../shared/config/formValidation';
import { FormActions } from '../../../shared/components/formActions';
import { Button } from '../../../shared/components/button';
import { useSmtpForm } from './hooks/useSmtpForm';
import { Alert } from '../../../shared/components/alert';

const encryptionValues: { value: SMTPEncryption; label: string }[] = [
  { value: 'NONE', label: 'None' },
  { value: 'STARTTLS', label: 'STARTTLS' },
  { value: 'IMPLICIT_TLS', label: 'SSL/TLS' },
];

export const SMTPSettings = () => {
  const { data: storedSettings } = useGetSmtpSettingsQuery();
  const formMethods = useAppForm<SchoolSmtpSettingsRequest>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = formMethods;
  const { update, isLoading, apiError } = useSmtpForm(formMethods);

  useEffect(() => {
    if (!storedSettings) {
      return;
    }

    reset({
      smtpHost: storedSettings.smtpHost ?? '',
      smtpPort: storedSettings.smtpPort ?? 1,
      smtpUsername: storedSettings.smtpUsername ?? '',
      smtpPassword: '',
      encryption: storedSettings.encryption ?? '',
      fromEmail: storedSettings.fromEmail ?? '',
      fromName: storedSettings.fromName ?? '',
    });
  }, [storedSettings, reset]);

  const smtpHost = register(
    'smtpHost',
    createNonEmptyValidation<SchoolSmtpSettingsRequest, 'smtpHost'>(),
  );

  const smtpPort = register('smtpPort', {
    valueAsNumber: true,
    required: {
      value: true,
      message: 'Please fill this field',
    },
    min: {
      value: 1,
      message: 'Value must be greater than or equal to 1',
    },
    validate: value =>
      Number.isInteger(value) || 'Value must be a whole number',
  });

  const smtpUsername = register(
    'smtpUsername',
    createNonEmptyValidation<SchoolSmtpSettingsRequest, 'smtpUsername'>(),
  );
  const smtpPassword = register('smtpPassword', {
    validate: value => {
      if (storedSettings?.smtpPasswordConfigured && !value) {
        return true;
      }

      return value?.trim() ? true : 'SMTP password is required';
    },
  });
  const fromEmail = register(
    'fromEmail',
    createEmailValidation<SchoolSmtpSettingsRequest, 'fromEmail'>(),
  );
  const fromName = register(
    'fromName',
    createNonEmptyValidation<SchoolSmtpSettingsRequest, 'fromName'>(),
  );

  return (
    <Form onSubmit={handleSubmit(update)}>
      {apiError && (
        <Alert message={'Something went wrong. Please try again later.'} />
      )}
      <Input
        {...smtpHost}
        label={'SMTP Host'}
        placeholder={'Enter SMTP Host'}
        error={errors.smtpHost?.message}
      />
      <Input
        {...smtpPort}
        label={'Port'}
        placeholder={'Enter Port'}
        type="number"
        step="1"
        min="1"
        error={errors.smtpPort?.message}
      />
      <Controller
        control={control}
        name="encryption"
        rules={{
          required: {
            value: true,
            message: 'Please choose encryption',
          },
        }}
        defaultValue={
          encryptionValues.find(v => v.value === storedSettings?.encryption)
            ?.value
        }
        render={({ field, fieldState }) => (
          <Select
            {...field}
            label={'Encryption'}
            placeholder={'Select encryption'}
            options={encryptionValues}
            error={fieldState.error?.message}
            value={field.value}
          />
        )}
      />
      <Input
        {...smtpUsername}
        label={'Username'}
        placeholder={'Enter Username'}
        error={errors.smtpUsername?.message}
      />
      <Input
        {...smtpPassword}
        label={'Password'}
        error={errors.smtpPassword?.message}
        placeholder={
          storedSettings?.smtpPasswordConfigured
            ? 'Password is already configured'
            : 'Enter smtp password'
        }
        type={'password'}
      />
      <Input
        {...fromName}
        label={'From Name'}
        placeholder={'Enter From Name'}
        error={errors.fromName?.message}
      />
      <Input
        {...fromEmail}
        label={'From Email'}
        placeholder={'Enter From Email'}
        error={errors.fromEmail?.message}
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
