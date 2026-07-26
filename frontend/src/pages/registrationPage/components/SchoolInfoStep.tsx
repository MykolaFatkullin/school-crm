import { Controller, useFormContext } from 'react-hook-form';
import { RegisterForm } from '../RegisterForm.type';
import { Input } from '../../../shared/input';
import { Button } from '../../../shared/button';
import { ArrowRight } from 'lucide-react';

type Props = {
  clearInputError: (name: keyof RegisterForm) => void;
};

export const SchoolInfoStep = ({ clearInputError }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterForm>();

  return (
    <>
      <Controller
        control={control}
        name="schoolName"
        rules={{
          required: {
            value: true,
            message: 'School name must no be empty',
          },
        }}
        defaultValue={''}
        render={({ field: { onChange, ...restInputFields } }) => (
          <Input
            {...restInputFields}
            label={'School Name'}
            error={errors.schoolName?.message}
            placeholder={'Enter school name'}
            onChange={e => {
              onChange(e);
              clearInputError(e.target.name as keyof RegisterForm);
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="administratorName"
        rules={{
          required: {
            value: true,
            message: 'Administrator name must not be empty',
          },
        }}
        defaultValue={''}
        render={({ field: { onChange, ...restInputFields } }) => (
          <Input
            {...restInputFields}
            label={'Administrator name'}
            error={errors.administratorName?.message}
            placeholder={'Enter administrator name'}
            onChange={e => {
              onChange(e);
              clearInputError(e.target.name as keyof RegisterForm);
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="schoolEmail"
        rules={{
          required: {
            value: true,
            message: 'School email must not be empty',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        defaultValue={''}
        render={({ field: { onChange, ...restInputFields } }) => (
          <Input
            {...restInputFields}
            label={'School email'}
            error={errors.schoolEmail?.message}
            placeholder={'Enter school email'}
            onChange={e => {
              onChange(e);
              clearInputError(e.target.name as keyof RegisterForm);
            }}
          />
        )}
      />
      <Button type="submit" variant={'primary'}>
        Continue <ArrowRight size={18} />
      </Button>
    </>
  );
};
