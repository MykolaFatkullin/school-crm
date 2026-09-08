import { useGetMetaQuery } from '../../api/notifications/notificationsApi';
import { useDispatch } from 'react-redux';
import { setUnreadCount } from '../../store/notificationsSlice';
import { useEffect } from 'react';

export const useGetNotificationsMeta = (skip: boolean) => {
  const { data, isLoading } = useGetMetaQuery(undefined, {
    skip: skip,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUnreadCount(data.unreadNotificationsCount));
    }
  }, [data, dispatch]);

  return isLoading;
};
