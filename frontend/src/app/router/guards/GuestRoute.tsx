import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { LoadingPage } from '../../../pages/loadingPage';

export const GuestRoute = () => {
  const status = useSelector((state: RootState) => state.auth.status);

  if (status === 'unknown') {
    return <LoadingPage />;
  }

  if (status === 'authenticated') {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
