import './App.scss';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './store/store';
import { ToastProvider } from '../shared/components/toast';
import { GlobalErrorComponent } from '../shared/components/globalErrorComponent';
import { AppInitializer } from './providers';

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
