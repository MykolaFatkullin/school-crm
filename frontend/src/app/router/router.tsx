import { createBrowserRouter } from 'react-router-dom';
import { appRoutes, authRoutes, rootRoutes } from './routes';

export const router = createBrowserRouter([authRoutes, appRoutes, rootRoutes]);
