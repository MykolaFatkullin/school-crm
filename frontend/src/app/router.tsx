import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from "./layouts/auth/AuthLayout";
import { HomePage } from "../pages/homePage/HomePage";

export const router = createBrowserRouter(
  [
    {
      element: <AuthLayout/>,
      children: [
        {
          path: '/',
          element: <HomePage/>
        },
        {
          path: '/register',
          element: <div>Register</div>,
        }
      ]
    }
  ],
)
