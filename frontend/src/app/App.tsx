import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './store/store';
import { ToastProvider } from '../shared/components/toast';
import { useRefresh } from './hooks/auth';
import { LoadingPage } from '../pages/loadingPage';
import { GlobalErrorComponent } from '../shared/components/globalErrorComponent';
import { router } from './router';

const AppInitializer = () => {
  const { refresh } = useRefresh();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await refresh();
      } finally {
        setInitialized(true);
      }
    };

    void initialize();
  }, [refresh]);

  if (!initialized) {
    return <LoadingPage />;
  }

  return <RouterProvider router={router} />;
};

const AppContent = () => {
  const error = useSelector((state: RootState) => state.globalError.type);

  if (error) {
    return <GlobalErrorComponent errorType={error} />;
  }

  return <AppInitializer />;
};

export const App = () => (
  <Provider store={store}>
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  </Provider>
);
