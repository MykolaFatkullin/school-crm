import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../guards';
import { ROUTES } from '../../../shared/config';
import { AppLayout } from '../../layouts/app';

export const appRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        {
          path: ROUTES.APP,
          element: <div>YTs</div>,
        },
      ],
    },
  ],
};
