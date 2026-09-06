import { useDispatch } from 'react-redux';
import { useReadNotificationMutation } from '../../../../../api/notifications/notificationsApi';
import { readNotification } from '../../../../../store/notificationsSlice';

export const useReadNotification = () => {
  const dispatch = useDispatch();
  const [read, { isLoading }] = useReadNotificationMutation();

  const markAsRead = async (id: string) => {
    const result = await read(id);

    if (!('error' in result)) {
      dispatch(readNotification(id));
    }
  };

  return { markAsRead, isLoading };
};
