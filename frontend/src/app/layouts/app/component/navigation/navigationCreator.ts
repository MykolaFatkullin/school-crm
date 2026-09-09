import { NavigationModel } from './NavigationModel';
import {
  BookOpen,
  Calendar,
  ChartNoAxesColumn,
  Clipboard,
  CreditCard,
  FileText,
  House,
  LayoutDashboard,
  MessageCircle,
  Settings,
  SquareCheckBig,
  Tag,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { UserRoles } from '../../../../../entities/user/model';
import { ROUTES } from '../../../../../shared/config';

export const dashboardNavigation: NavigationModel = {
  title: '',
  navigations: [
    {
      title: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
      roles: [],
    },
  ],
};

export const academicsNavigation: NavigationModel = {
  title: 'Academics',
  navigations: [
    {
      title: 'Students',
      path: ROUTES.ACADEMICS_STUDENTS,
      icon: User,
      roles: [],
    },
    {
      title: 'Teachers',
      path: ROUTES.ACADEMICS_TEACHERS,
      icon: Users,
      roles: [UserRoles.ADMIN, UserRoles.TEACHER],
    },
    {
      title: 'Parents',
      path: ROUTES.ACADEMICS_PARENTS,
      icon: House,
      roles: [UserRoles.ADMIN, UserRoles.TEACHER, UserRoles.PARENT],
    },
    {
      title: 'Classes',
      path: ROUTES.ACADEMICS_CLASSES,
      icon: BookOpen,
      roles: [],
    },
    {
      title: 'Subjects',
      path: ROUTES.ACADEMICS_SUBJECTS,
      icon: Tag,
      roles: [],
    },
    {
      title: 'Schedule',
      path: ROUTES.ACADEMICS_SCHEDULE,
      icon: Calendar,
      roles: [],
    },
  ],
};

export const learningNavigation: NavigationModel = {
  title: 'Learning',
  navigations: [
    {
      title: 'Homework',
      path: ROUTES.LEARNING_HOMEWORK,
      icon: Clipboard,
      roles: [],
    },
    {
      title: 'Attendance',
      path: ROUTES.LEARNING_ATTENDANCE,
      icon: SquareCheckBig,
      roles: [],
    },
    {
      title: 'Grades',
      path: ROUTES.LEARNING_GRADES,
      icon: ChartNoAxesColumn,
      roles: [],
    },
  ],
};

export const administrationNavigation: NavigationModel = {
  title: 'Administration',
  navigations: [
    {
      title: 'Users',
      path: ROUTES.ADMINISTRATION_USERS,
      icon: UserPlus,
      roles: [UserRoles.ADMIN],
    },
    {
      title: 'Billing',
      path: ROUTES.ADMINISTRATION_BILLING,
      icon: CreditCard,
      roles: [UserRoles.ADMIN, UserRoles.PARENT],
    },
    {
      title: 'Reports',
      path: ROUTES.ADMINISTRATION_REPORTS,
      icon: FileText,
      roles: [],
    },
    {
      title: 'School settings',
      path: ROUTES.ADMINISTRATION_SCHOOL_SETTINGS,
      icon: Settings,
      roles: [UserRoles.ADMIN],
    },
  ],
};

export const communicationNavigation: NavigationModel = {
  title: 'Communication',
  navigations: [
    {
      title: 'Messages',
      path: ROUTES.MESSAGES,
      icon: MessageCircle,
      roles: [],
    },
  ],
};
