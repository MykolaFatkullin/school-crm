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
          path: ROUTES.DASHBOARD,
          element: <div>DASHBOARD</div>,
        },
        {
          path: ROUTES.ACADEMICS_STUDENTS,
          element: <div>ACADEMICS_STUDENTS</div>,
        },
        {
          path: ROUTES.ACADEMICS_TEACHERS,
          element: <div>ACADEMICS_TEACHERS</div>,
        },
        {
          path: ROUTES.ACADEMICS_PARENTS,
          element: <div>ACADEMICS_PARENTS</div>,
        },
        {
          path: ROUTES.ACADEMICS_CLASSES,
          element: <div>ACADEMICS_CLASSES</div>,
        },
        {
          path: ROUTES.ACADEMICS_SUBJECTS,
          element: <div>ACADEMICS_SUBJECTS</div>,
        },
        {
          path: ROUTES.ACADEMICS_SCHEDULE,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.LEARNING_HOMEWORK,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.LEARNING_ATTENDANCE,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.LEARNING_GRADES,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.ADMINISTRATION_USERS,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.ADMINISTRATION_BILLING,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.ADMINISTRATION_REPORTS,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.ADMINISTRATION_SCHOOL_SETTINGS,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.SETTINGS,
          element: <div>YTs</div>,
        },
        {
          path: ROUTES.HELP,
          element: <div>YTs</div>,
        },
      ],
    },
  ],
};
