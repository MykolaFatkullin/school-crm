import { Bell, Check } from 'lucide-react';
import { Icon } from '../../../../../shared/components/icons';
import styles from './NotificationDropdown.module.scss';
import classNames from 'classnames';
import { Button } from '../../../../../shared/components/button';
import { formatNotificationDate } from '../../../../../shared/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useReadAllNotifications } from './hooks/useReadAllNotifications';
import { useClearAllNotifications } from './hooks/useClearAllNotifications';
import { useReadNotification } from './hooks/useReadNotification';
import { useGetAllNotificationsQuery } from '../../../../api/notifications/notificationsApi';
import { useCallback, useEffect, useState } from 'react';
import {
  appendNotifications,
  setNotifications,
} from '../../../../store/notificationsSlice';
import { NotificationsResponseDto } from '../../../../api/notifications/response';
import { NotificationType } from '../../../../../entities/notifications';
import { useInfiniteScrollTrigger } from '../../../../../shared/hooks';

const PAGE_SIZE = 10;

type Props = {
  isNotificationsOpen: boolean;
};

const getEmptyData = () => {
  return (
    <div className={styles.notificationEmpty}>
      <div className={styles.notificationEmptyDataIconWrapper}>
        <Icon
          icon={Check}
          size={24}
          className={styles.notificationEmptyDataIcon}
        />
      </div>
      <div className={styles.notificationEmptyData}>
        <p className={styles.notificationEmptyDataText}>No new notifications</p>
        <p className={styles.notificationEmptyDataAdditionalText}>
          You're all caught up!
        </p>
      </div>
    </div>
  );
};

const renderNotification = (
  notifications: NotificationsResponseDto[],
  readNotification: (id: string) => void,
  lastElementRef: (node: HTMLElement | null) => void,
) => {
  return (
    <ul className={styles.notificationList}>
      {notifications.map((notification, index) => (
        <li
          ref={index === notifications.length - 1 ? lastElementRef : undefined}
          className={classNames(styles.notificationItem, {
            [styles.notificationUnread]: !notification.read,
          })}
          key={notification.id}
          onClick={() => {
            if (!notification.read) {
              readNotification(notification.id);
            }
          }}
        >
          <Icon
            icon={Bell}
            size={18}
            className={classNames(styles.notificationIcon, {
              [styles.notificationUnreadIcon]: !notification.read,
            })}
          />
          <div className={styles.notificationContent}>
            <div className={styles.notificationTopLine}>
              <p className={styles.notificationType}>
                {NotificationType[notification.type]}
              </p>
              {!notification.read && (
                <span className={styles.notificationStatus} />
              )}
            </div>
            <p className={styles.notificationText}>{notification.message}</p>
            <p className={styles.notificationDate}>
              {formatNotificationDate(notification.createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const NotificationDropdown = ({ isNotificationsOpen }: Props) => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  );
  const dispatch = useDispatch();
  const isEmpty = notifications.length === 0;

  const [page, setPage] = useState(0);
  const [prevIsOpen, setPrevIsOpen] = useState(isNotificationsOpen);

  const { data, isFetching } = useGetAllNotificationsQuery(
    { page, size: PAGE_SIZE },
    {
      skip: !isNotificationsOpen,
    },
  );

  if (isNotificationsOpen !== prevIsOpen) {
    setPrevIsOpen(isNotificationsOpen);
    if (isNotificationsOpen) {
      setPage(0);
    }
  }

  const isLastPage = data?.last ?? false;

  useEffect(() => {
    if (!data || isFetching) return;

    if (page === 0) {
      dispatch(setNotifications(data.content));
    } else {
      dispatch(appendNotifications(data.content));
    }
  }, [data, isFetching, page, dispatch]);

  const loadMore = useCallback(() => {
    if (isFetching || isLastPage) return;
    setPage(prev => prev + 1);
  }, [isFetching, isLastPage]);

  const { markAsRead } = useReadNotification();

  const readNotification = (notificationId: string) => {
    void markAsRead(notificationId);
  };

  const { readNotifications, isLoading } = useReadAllNotifications();
  const { clearAllNotifications, isLoading: clearAllNotificationsLoading } =
    useClearAllNotifications();
  const lastElementRef = useInfiniteScrollTrigger(
    loadMore,
    isFetching || isLastPage,
  );

  return (
    <div
      className={classNames(
        styles.notificationDropdown,
        isNotificationsOpen && styles.notificationDropdownOpen,
      )}
    >
      <div className={styles.notificationDropdownHeader}>
        <p className={styles.notificationDropdownTitle}>Notifications</p>
        {!isEmpty && (
          <div className={styles.notificationDropdownButtons}>
            <Button
              variant={'text'}
              onClick={readNotifications}
              disabled={isLoading}
            >
              Read all
            </Button>
            <span className={styles.notificationDropdownButtonsSeparator} />
            <Button
              variant={'text'}
              onClick={() => clearAllNotifications()}
              disabled={clearAllNotificationsLoading}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
      {isEmpty
        ? getEmptyData()
        : renderNotification(notifications, readNotification, lastElementRef)}
    </div>
  );
};
