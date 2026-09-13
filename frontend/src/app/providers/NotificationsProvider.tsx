import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationSocket } from '../websocket/notifications/NotificationSocket';
import { addNewNotification } from '../store/notificationsSlice';
import { toast } from '../../shared/components/toast';
import { NotificationType } from '../../entities/notifications';
import { RootState } from '../store/store';

type Props = {
  children: React.ReactNode;
};

export const NotificationsProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (!token) return;

    const socket = new NotificationSocket({
      url: '/ws',
      token,

      onNotification: notification => {
        dispatch(addNewNotification(notification));
        toast.info(NotificationType[notification.type], notification.message);
      },
    });

    socket.connect();

    return () => {
      void socket.disconnect();
    };
  }, [token, dispatch]);

  return children;
};
