import { useDeleteNotificationsMutation } from '../../../../../api/notifications/notificationsApi';
import { useDispatch } from 'react-redux';
import { removeNotifications } from '../../../../../store/notificationsSlice';

export const useClearAllNotifications = () => {
  const [deleteNotifications, { isLoading }] = useDeleteNotificationsMutation();
  const dispatch = useDispatch();

  const clearAllNotifications = async () => {
    await deleteNotifications().unwrap();
    dispatch(removeNotifications());
  };

  return { clearAllNotifications, isLoading };
};
