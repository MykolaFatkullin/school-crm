import { NotificationType } from './index';

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
};
