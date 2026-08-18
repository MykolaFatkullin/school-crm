import { RouterProvider } from 'react-router-dom';
import { router } from './layouts/router';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastProvider } from '../shared/components/toast';

export const App = () => (
  <Provider store={store}>
    <ToastProvider>
      <RouterProvider router={router}></RouterProvider>
    </ToastProvider>
  </Provider>
);
