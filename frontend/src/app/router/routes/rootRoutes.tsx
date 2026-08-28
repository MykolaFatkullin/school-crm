import { RouteObject } from 'react-router-dom';
import { ROUTES } from '../../../shared/config';
import { RootRoute } from '../guards';
import { AuthLayout } from '../../layouts/auth';

export const rootRoutes: RouteObject = {
  path: ROUTES.HOME,
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <RootRoute />,
    },
  ],
};
