import { createBrowserRouter } from 'react-router-dom';
import { authRoutes } from './routes';
import { appRoutes } from './routes';
import { rootRoutes } from './routes';

export const router = createBrowserRouter([authRoutes, appRoutes, rootRoutes]);
