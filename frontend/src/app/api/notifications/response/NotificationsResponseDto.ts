import { NotificationType } from '../../../../entities/notifications';

export type NotificationsResponseDto = {
  id: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
};
