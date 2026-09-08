import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { useSelector } from 'react-redux';
import { LoadingPage } from '../../../pages/loadingPage';
import { RootState } from '../../store/store';

export const ProtectedRoute = () => {
  const status = useSelector((state: RootState) => state.auth.status);

  if (status === 'unknown') {
    return <LoadingPage />;
  }

  if (status === 'unauthenticated') {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
