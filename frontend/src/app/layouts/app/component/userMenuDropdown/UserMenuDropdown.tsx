import styles from './UserMenuDropdown.module.scss';
import { ROUTES } from '../../../../../shared/config';
import { NavLink } from 'react-router-dom';
import { CircleQuestionMark, LogOut, Settings } from 'lucide-react';
import classNames from 'classnames';
import { useLogout } from './hooks/useLogout';

type Props = {
  isOpened: boolean;
  onRedirect?: () => void;
};

export const UserMenuDropdown = ({ isOpened, onRedirect }: Props) => {
  const { handleLogout } = useLogout();

  return (
    <div
      className={classNames(styles.userMenuDropdown, {
        [styles.userMenuDropdownOpen]: isOpened,
      })}
    >
      <nav className={styles.navigation}>
        <NavLink
          to={ROUTES.CHANGE_PASSWORD}
          className={styles.link}
          onClick={onRedirect}
        >
          <Settings size={20} />
          Change password
        </NavLink>
        <NavLink to={ROUTES.HELP} className={styles.link} onClick={onRedirect}>
          <CircleQuestionMark size={20} />
          Help & Support
        </NavLink>
      </nav>
      <button
        className={styles.logOutButton}
        onClick={() => void handleLogout()}
      >
        <LogOut size={20} />
        Log Out
      </button>
    </div>
  );
};
