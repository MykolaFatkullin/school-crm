import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../auth';
import { HomePage } from '../../../pages/homePage';
import { ROUTES } from './routes';
import { RegistrationPage } from '../../../pages/registrationPage';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.REGISTRATION,
        element: <RegistrationPage />,
      },
    ],
  },
]);
