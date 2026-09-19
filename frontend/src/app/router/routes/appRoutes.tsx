import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../guards';
import { ROUTES } from '../../../shared/config';
import { AppLayout } from '../../layouts/app';
import { ChangePasswordPage } from '../../../pages/changePasswordPage';
import { SchoolSettingsPage } from '../../../pages/schoolSettingsPage';

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
          handle: {
            breadcrumb: 'Students',
          },
        },
        {
          path: ROUTES.ACADEMICS_TEACHERS,
          element: <div>ACADEMICS_TEACHERS</div>,
          handle: {
            breadcrumb: 'Teachers',
          },
        },
        {
          path: ROUTES.ACADEMICS_PARENTS,
          element: <div>ACADEMICS_PARENTS</div>,
          handle: {
            breadcrumb: 'Parents',
          },
        },
        {
          path: ROUTES.ACADEMICS_CLASSES,
          element: <div>ACADEMICS_CLASSES</div>,
          handle: {
            breadcrumb: 'Classes',
          },
        },
        {
          path: ROUTES.ACADEMICS_SUBJECTS,
          element: <div>ACADEMICS_SUBJECTS</div>,
          handle: {
            breadcrumb: 'Subjects',
          },
        },
        {
          path: ROUTES.ACADEMICS_SCHEDULE,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Schedule',
          },
        },
        {
          path: ROUTES.LEARNING_HOMEWORK,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Homework',
          },
        },
        {
          path: ROUTES.LEARNING_ATTENDANCE,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Attendance',
          },
        },
        {
          path: ROUTES.LEARNING_GRADES,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Grades',
          },
        },
        {
          path: ROUTES.MESSAGES,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Messages',
          },
        },
        {
          path: ROUTES.ADMINISTRATION_USERS,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Users',
          },
        },
        {
          path: ROUTES.ADMINISTRATION_BILLING,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Billing',
          },
        },
        {
          path: ROUTES.ADMINISTRATION_REPORTS,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Reports',
          },
        },
        {
          path: ROUTES.ADMINISTRATION_SCHOOL_SETTINGS,
          element: <SchoolSettingsPage />,
          handle: {
            breadcrumb: 'School Settings',
          },
        },
        {
          path: ROUTES.CHANGE_PASSWORD,
          element: <ChangePasswordPage />,
          handle: {
            breadcrumb: 'Change Password',
          },
        },
        {
          path: ROUTES.HELP,
          element: <div>YTs</div>,
          handle: {
            breadcrumb: 'Help',
          },
        },
      ],
    },
  ],
};
