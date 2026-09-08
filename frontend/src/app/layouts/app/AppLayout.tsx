import { Sidebar } from './component/sidebar';
import { MainArea } from './component/mainArea';
import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.scss';

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <MainArea>
        <Outlet />
      </MainArea>
    </div>
  );
};
