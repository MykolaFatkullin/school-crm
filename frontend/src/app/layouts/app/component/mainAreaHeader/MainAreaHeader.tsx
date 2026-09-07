import styles from './MainAreaHeader.module.scss';
import { Button } from '../../../../../shared/components/button';
import { Icon } from '../../../../../shared/components/icons';
import { Bell, ChevronDown } from 'lucide-react';
import { SearchInput } from '../searchInput';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { UserMenuDropdown } from '../userMenuDropdown';
import { NotificationDropdown } from '../notificationDropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useMeQuery } from '../../../../api/account/accountApi';
import { UserRoles } from '../../../../../entities/user/model';

const MAX_NOTIFICATION_COUNT = 99;

const mapRoleToUi = (role: UserRoles | undefined) => {
  switch (role) {
    case UserRoles.ADMIN:
      return 'Administrator';
    case UserRoles.TEACHER:
      return 'Teacher';
    case UserRoles.STUDENT:
      return 'Student';
    case UserRoles.PARENT:
      return 'Parent';
    default:
      return 'Unknown';
  }
};

export const MainAreaHeader = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const unreadNotifications = useSelector(
    (root: RootState) => root.notifications.unreadCount,
  );
  const { data: accountInfo } = useMeQuery();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const shownNotifications =
    unreadNotifications >= MAX_NOTIFICATION_COUNT
      ? MAX_NOTIFICATION_COUNT
      : unreadNotifications;

  const initials = `${accountInfo?.firstName?.charAt(0)?.toUpperCase() ?? ''}${accountInfo?.lastName?.charAt(0)?.toUpperCase() ?? ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.searchWrapper}>
        <SearchInput placeholder={'Search students, classes, teachers...'} />
      </div>
      <div className={styles.notificationButton} ref={notificationRef}>
        <Button
          variant="iconButton"
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        >
          <Bell size={20} />
        </Button>
        {unreadNotifications > 0 && (
          <span className={styles.notificationCount}>{shownNotifications}</span>
        )}

        <NotificationDropdown isNotificationsOpen={isNotificationsOpen} />
      </div>
      <div className={styles.userMenuWrapper} ref={userMenuRef}>
        <button
          className={styles.userMenu}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <div className={styles.avatar}>
            <span className={styles.initials}>{initials}</span>
          </div>
          <div className={styles.user}>
            <p
              className={styles.name}
            >{`${accountInfo?.firstName} ${accountInfo?.lastName}`}</p>
            <p className={styles.role}>{mapRoleToUi(accountInfo?.role)}</p>
          </div>
          <Icon
            icon={ChevronDown}
            size={14}
            className={classNames(styles.icon, {
              [styles.iconOpen]: isUserMenuOpen,
            })}
          />
        </button>

        <UserMenuDropdown
          isOpened={isUserMenuOpen}
          onRedirect={() => setIsUserMenuOpen(false)}
        />
      </div>
    </header>
  );
};
