import { createBrowserRouter } from 'react-router-dom';
import { RootPage } from './pages/root';
import { HomePage } from './pages/home';
import { LogInPage } from './pages/login';
import { OwnerPage } from './pages/owner';
import { OwnerDashboardPage } from './pages/owner/dashboard';
import { OwnerInspectorsPage } from './pages/owner/inspectors';
import { InspectorPage } from './pages/inspector';
import { UserRegister } from './pages/users/register';
import { UsersPage } from './pages/users';
import { UserDashboardPage } from './pages/users/dashboard';
import { InspectorUsersPage } from './pages/inspector/users';

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
        path: 'i',
        element: <InspectorPage />,
        children: [
          {
            path: 'users',
            element: <InspectorUsersPage />
          }
        ]
      },
      {
        path: 'u',
        element: <UsersPage />,
        children: [
          {
            index: true,
            element: <UserDashboardPage />
          }
        ]
      },
      {
        path: 'u/register',
        element: <UserRegister />
      },
      {
        path: 'login',
        element: <LogInPage />
      }
    ]
  }
]);
