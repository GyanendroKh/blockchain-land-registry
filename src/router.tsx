import { createBrowserRouter } from 'react-router-dom';
import { RootPage } from './pages/root';
import { HomePage } from './pages/home';
import { LogInPage } from './pages/login';
import { OwnerPage } from './pages/owner';
import { OwnerDashboardPage } from './pages/owner/dashboard';
import { OwnerInspectorsPage } from './pages/owner/inspectors';

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
        element: <OwnerPage />,
        children: [
          {
            index: true,
            element: <OwnerDashboardPage />
          },
          {
            path: 'inspectors',
            element: <OwnerInspectorsPage />
          }
        ]
      },
      {
        path: 'login',
        element: <LogInPage />
      }
    ]
  }
]);
