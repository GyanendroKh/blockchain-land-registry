import { createBrowserRouter } from 'react-router-dom';
import { RootPage } from './pages/root';
import { HomePage } from './pages/home';
import { LogInPage } from './pages/login';
import { OwnerPage } from './pages/owner';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'o',
        element: <OwnerPage />
      },
      {
        path: 'login',
        element: <LogInPage />
      }
    ]
  }
]);
