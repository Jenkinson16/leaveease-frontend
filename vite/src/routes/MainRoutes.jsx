import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/AuthGuard';

// leave management
const LeavesPage = Loadable(lazy(() => import('views/leaves')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <LeavesPage />
    },
    {
      path: 'leaves',
      element: <LeavesPage />
    }
  ]
};

export default MainRoutes;
