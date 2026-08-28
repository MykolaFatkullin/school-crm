import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { HomePage } from '../../../pages/homePage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const RootRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to={ROUTES.APP} replace />;
  }

  return <HomePage />;
};
