import React from 'react';
import Dashboard from '../pages/dashboard';
import Users from '../pages/users';
import Offers from '../pages/offers';
import Organizations from '../pages/organizations';
import NotFound from '../../components/NotFound';

const routes = [
    {
        path: '/',
        exact: true,
        component: () => <h2>Welcome!</h2>
    },
    {
        path: '/dashboard',
        exact: true,
        component: () => <Dashboard />
    },
    {
        path: '/offers',
        exact: true,
        component: () => <Offers />
    },
    {
        path: '/users',
        exact: true,
        component: () => <Users />
    },
    {
        path: '/organizations',
        exact: true,
        component: () => <Organizations />
    },
    {
        path: '*',
        component: () => <NotFound />
    },

];

export default routes;