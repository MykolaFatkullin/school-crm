import { Logo } from '../../../../../shared/components/icons';
import styles from './Sidebar.module.scss';
import { Navigation } from '../navigation/Navigation';
import {
  academicsNavigation,
  administrationNavigation,
  communicationNavigation,
  dashboardNavigaton,
  learningNavigation,
} from '../navigation/navigationCreator';
import { useMeQuery } from '../../../../api/account/accountApi';

export const Sidebar = () => {
  const { data: me } = useMeQuery();
  const userRole = me!.role;

  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <Logo size={22} />
        <h1 className={styles.title}>School CRM</h1>
      </header>
      <div className={styles.nav}>
        <Navigation navigationModel={dashboardNavigaton} userRole={userRole} />
        <Navigation navigationModel={academicsNavigation} userRole={userRole} />
        <Navigation navigationModel={learningNavigation} userRole={userRole} />
        <Navigation
          navigationModel={communicationNavigation}
          userRole={userRole}
        />
        <Navigation
          navigationModel={administrationNavigation}
          userRole={userRole}
        />
      </div>
    </aside>
  );
};
