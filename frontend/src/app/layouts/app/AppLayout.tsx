import { Sidebar } from './component/sidebar';
import { MainArea } from './component/mainArea';
import styles from './AppLayout.module.scss';
import { Breadcrumbs } from './component/breadCrumbs';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <MainArea>
        <Breadcrumbs />
        <Outlet />
      </MainArea>
    </div>
  );
};
