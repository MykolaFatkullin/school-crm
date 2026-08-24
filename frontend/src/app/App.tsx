import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './layouts/router';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastProvider } from '../shared/components/toast';
import { useRefresh } from './hooks/auth';

const AppInitializer = () => {
  const { refresh } = useRefresh();

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return <RouterProvider router={router} />;
};

export const App = () => (
  <Provider store={store}>
    <ToastProvider>
      <AppInitializer />
    </ToastProvider>
  </Provider>
);
