import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../auth';
import { HomePage } from '../../../pages/homePage';
import { RegistrationPage } from '../../../pages/registrationPage';
import { ROUTES } from '../../../shared/config';
import { MailVerificationPage } from '../../../pages/mailVerificationPage';
import { SuccessRegistrationPage } from '../../../pages/successRegistrationPage';
import { LoginPage } from '../../../pages/loginPage';
import { ResetPasswordPage } from '../../../pages/resetPasswordPage';
import { SetNewPasswordPage } from '../../../pages/setNewPasswordPage';
import { ResetPasswordResultPage } from '../../../pages/resetPasswordResultPage';
import {
  ResetPasswordSentPage
} from '../../../pages/resetPasswordSentPage';

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
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SUCCESS_REGISTRATION,
        element: <SuccessRegistrationPage />,
      },
      {
        path: `${ROUTES.EMAIL_VERIFICATION}/:token`,
        element: <MailVerificationPage />,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: ROUTES.RESET_PASSWORD_SENT,
        element: <ResetPasswordSentPage />,
      },
      {
        path: `${ROUTES.SET_NEW_PASSWORD}/:token`,
        element: <SetNewPasswordPage />,
      },
      {
        path: ROUTES.RESET_PASSWORD_RESULT,
        element: <ResetPasswordResultPage />,
      },
    ],
  },
]);
