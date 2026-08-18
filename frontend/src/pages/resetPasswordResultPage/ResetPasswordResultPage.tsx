import { SuccessAuthComponent } from '../../shared/components/successAuthComponent';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../shared/config';

export const ResetPasswordResultPage = () => {
  const { state } = useLocation();

  if (state?.success === undefined) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <SuccessAuthComponent
      title={'Password updated'}
      description={'Your password has been successfully changed.'}
    />
  );
};
