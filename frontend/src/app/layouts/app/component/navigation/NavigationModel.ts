import { UserRoles } from '../../../../../entities/user/model';
import { LucideIcon } from 'lucide-react';

export interface NavigationModel {
  title: string;
  navigations: NavigationItem[];
}

interface NavigationItem {
  title: string;
  path: string;
  icon: LucideIcon;
  roles: UserRoles[];
}
