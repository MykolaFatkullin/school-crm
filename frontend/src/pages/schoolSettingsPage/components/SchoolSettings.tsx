import { Form } from '../../../shared/components/form';
import { Input } from '../../../shared/components/input';
import { Select } from '../../../shared/components/select';
import { useGetSchoolQuery } from '../../../app/api/school/schoolApi';
import { useAppForm } from '../../../shared/hooks';
import { School } from '../../../entities/school';
import { Controller } from 'react-hook-form';
import { Button } from '../../../shared/components/button';
import { useSchoolForm } from './hooks/useSchoolForm';
import { Alert } from '../../../shared/components/alert';
import { createNonEmptyValidation } from '../../../shared/config/formValidation';
import { FormActions } from '../../../shared/components/formActions';
import { useEffect } from 'react';

export const SchoolSettings = () => {
  const { data: storedSettings } = useGetSchoolQuery();
  const formMethods = useAppForm<School>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = formMethods;
  const { update, isLoading, apiError } = useSchoolForm(formMethods);

  const timeZones = Intl.supportedValuesOf('timeZone').map(timeZone => ({
    label: timeZone,
    value: timeZone,
  }));

  const schoolName = register('name', createNonEmptyValidation());

  useEffect(() => {
    if (!storedSettings) {
      return;
    }

    reset({
      name: storedSettings.name ?? '',
      timezone: storedSettings.timezone ?? '',
    });
  }, [storedSettings, reset]);

  return (
    <Form onSubmit={handleSubmit(update)}>
      {apiError && (
        <Alert message={'Something went wrong. Please try again later.'} />
      )}
      <Input
        {...schoolName}
        label={'School name'}
        error={errors.name?.message}
        placeholder={'Enter school name'}
      />
      <Controller
        control={control}
        name="timezone"
        rules={{
          required: {
            value: true,
            message: 'Please choose school timezone',
          },
        }}
        defaultValue={''}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            label={'Time Zone'}
            placeholder={'Select a timezone'}
            options={timeZones}
            error={fieldState.error?.message}
            value={field.value}
          />
        )}
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
