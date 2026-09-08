import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { HomePage } from '../../../pages/homePage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { LoadingPage } from '../../../pages/loadingPage';

export const RootRoute = () => {
  const status = useSelector((state: RootState) => state.auth.status);

  if (status === 'unknown') {
    return <LoadingPage />;
  }

  if (status === 'authenticated') {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <HomePage />;
};
