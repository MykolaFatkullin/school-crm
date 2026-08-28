import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const GuestRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to={ROUTES.APP} replace />;
  }

  return <Outlet />;
};
