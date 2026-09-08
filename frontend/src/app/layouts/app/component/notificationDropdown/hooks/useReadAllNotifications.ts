import { useDispatch } from 'react-redux';
import { useReadAllMutation } from '../../../../../api/notifications/notificationsApi';
import { readAllNotifications } from '../../../../../store/notificationsSlice';

export const useReadAllNotifications = () => {
  const dispatch = useDispatch();
  const [readAll, { isLoading }] = useReadAllMutation();

  const readNotifications = async () => {
    await readAll().unwrap();
    dispatch(readAllNotifications());
  };

  return { readNotifications, isLoading };
};
