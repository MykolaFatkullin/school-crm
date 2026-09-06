import { useRefresh } from '../hooks/auth';
import { useEffect, useState } from 'react';
import { LoadingPage } from '../../pages/loadingPage';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';
import { AuthInitializer } from './AuthInitializer';

export const AppInitializer = () => {
  const { refresh } = useRefresh();
  const [initialized, setInitialized] = useState(false);
  const [refreshSucceeded, setRefreshSucceeded] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const accessToken = await refresh();

      setRefreshSucceeded(accessToken !== null);
      setInitialized(true);
    };

    void initialize();
  }, [refresh]);

  if (!initialized) {
    return <LoadingPage />;
  }

  return (
    <AuthInitializer refreshSucceeded={refreshSucceeded}>
      <RouterProvider router={router} />
    </AuthInitializer>
  );
};
