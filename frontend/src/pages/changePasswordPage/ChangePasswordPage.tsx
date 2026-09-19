import { AppPageTitleBlock } from '../../shared/components/appPageTitleBlock';
import { Form } from '../../shared/components/form';
import { Input } from '../../shared/components/input';
import { useAppForm } from '../../shared/hooks';
import { ChangePasswordForm } from './model';
import { createPasswordValidation } from '../../shared/config';
import { createConfirmPasswordValidation } from '../../shared/config/formValidation';
import { Button } from '../../shared/components/button';
import { ContentCard } from '../../shared/components/contentCard';
import { useChangePasswordForm } from './hooks/useChangePasswordForm';
import { Alert } from '../../shared/components/alert';
import styles from './ChangePasswordPage.module.scss';

export const ChangePasswordPage = () => {
  const formMethods = useAppForm<ChangePasswordForm>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const { submit, isLoading, apiError } = useChangePasswordForm(formMethods);

  const currentPassword = register('oldPassword', createPasswordValidation());
  const newPassword = register('newPassword', createPasswordValidation());
  const confirmPassword = register(
    'confirmPassword',
    createConfirmPasswordValidation('newPassword'),
  );

  const onSubmit = (data: ChangePasswordForm) => {
    void submit(data);
  };

  return (
    <div className={styles.changePasswordPageContent}>
      <AppPageTitleBlock
        title={'Change Password'}
        subtitle={'Update your account password to keep your account secure'}
      />
      <ContentCard>
        {apiError && (
          <Alert message={'Something went wrong. Please try again later.'} />
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...currentPassword}
            label={'Current Password'}
            type={'password'}
            error={errors.oldPassword?.message}
            placeholder={'Enter your current password'}
          />
          <Input
            {...newPassword}
            label={'New Password'}
            type={'password'}
            error={errors.newPassword?.message}
            placeholder={'Enter your new password'}
          />
          <Input
            {...confirmPassword}
            label={'Confirm New Password'}
            type={'password'}
            error={errors.confirmPassword?.message}
            placeholder={'Confirm your new password'}
          />
          <Button variant={'primary'} type={'submit'} disabled={isLoading}>
            Change Password
          </Button>
        </Form>
      </ContentCard>
    </div>
  );
};
