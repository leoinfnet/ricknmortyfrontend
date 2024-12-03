import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import UsuarioForm from './content/management/UsuarioForm';
import UsuarioFormValidacao from './content/management/UsuarioFormValidacao';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const UsersList = Loader(lazy(() => import('src/content/management/UsersList')));
const UsersForm = Loader(lazy(() => import('src/content/management/UsersList')));



// Applications


// Status




const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <UsersList />
      },
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='user-list' replace />
      },
      {
        path: 'user-list',
        element: <UsersList />
      },
      {
        path: "new-user",
        element: <UsuarioForm />
      },
      {
        path: "new-user-validacao",
        element: <UsuarioFormValidacao />
      },


    ]
  },
];

export default routes;
