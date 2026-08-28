import { Controller, useFormContext } from 'react-hook-form';
import { RegisterForm } from '../model';
import { Input } from '../../../shared/components/input';
import { Button } from '../../../shared/components/button';
import { ArrowRight } from 'lucide-react';
import { Select } from '../../../shared/components/select';
import style from './SchoolInfoStep.module.scss';
import { GENDER_OPTIONS } from '../../../entities/user/constants/genderOptions';
import { ROUTES } from '../../../shared/config';
import { AuthStepActions } from '../../../shared/components/authStepActions';
import { Link } from '../../../shared/components/link';

export const SchoolInfoStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RegisterForm>();

  const schoolName = register('schoolName', {
    required: {
      value: true,
      message: 'School name must not be empty',
    },
  });

  const firstName = register('firstName', {
    required: {
      value: true,
      message: 'First name must not be empty',
    },
  });

  const lastName = register('lastName', {
    required: {
      value: true,
      message: 'Last name must not be empty',
    },
  });

  return (
    <>
      <Input
        {...schoolName}
        label={'School Name'}
        error={errors.schoolName?.message}
        placeholder={'Enter school name'}
      />
      <div className={style.nameInfo}>
        <Input
          {...firstName}
          label={'First name'}
          error={errors.firstName?.message}
          placeholder={'First name'}
        />
        <Input
          {...lastName}
          label={'Last name'}
          error={errors.lastName?.message}
          placeholder={'Last name'}
        />
      </div>
      <Controller
        control={control}
        name="gender"
        rules={{
          required: {
            value: true,
            message: 'Please choose your gender',
          },
        }}
        defaultValue={''}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            label={'Gender'}
            placeholder={'Select gender'}
            options={GENDER_OPTIONS}
            error={fieldState.error?.message}
            value={field.value}
          />
        )}
      />
      <AuthStepActions>
        <Button type="submit" variant={'primary'}>
          Continue <ArrowRight size={18} />
        </Button>
        <Link
          to={ROUTES.LOGIN}
          type={'primaryText'}
          inlineText={'Already have an account?'}
        >
          Log in
        </Link>
      </AuthStepActions>
    </>
  );
};
