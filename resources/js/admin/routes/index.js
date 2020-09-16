import React from 'react';
import Dashboard from '../pages/dashboard';
import Needs from '../pages/needs';
import CreateNeeds from '../pages/needs/create';
import EidtNeeds from '../pages/needs/edit';
import NeedsCategory from '../pages/needs-category';
import CreateNeedsCategory from '../pages/needs-category/create';
import EditNeedsCategory from '../pages/needs-category/edit';
import Users from '../pages/users';
import CreateUser from '../pages/users/create';
import EditUser from '../pages/users/edit';
import Offers from '../pages/offers';
import EditOffer from '../pages/offers/edit';
import Stories from '../pages/stories';
import EditStory from '../pages/stories/edit';
import Organizations from '../pages/organizations';
import CreateOrganization from '../pages/organizations/create';
import EditOrganization from '../pages/organizations/edit';
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
        path: '/needs',
        exact: true,
        component: () => <Needs />
    },
    {
        path: '/needs/create',
        exact: true,
        component: () => <CreateNeeds />
    },
    {
        path: '/needs/edit/:id',
        exact: true,
        component: () => <EidtNeeds />
    },
    {
        path: '/needs/category',
        exact: true,
        component: () => <NeedsCategory />
    },
    {
        path: '/needs/category/create',
        exact: true,
        component: () => <CreateNeedsCategory />
    },
    {
        path: '/needs/category/edit/:id',
        exact: true,
        component: () => <EditNeedsCategory />
    },
    {
        path: '/offers',
        exact: true,
        component: () => <Offers />
    },
    {
        path: '/offers/edit/:id',
        exact: true,
        component: () => <EditOffer />
    },
    {
        path: '/stories',
        exact: true,
        component: () => <Stories />
    },
    {
        path: '/stories/edit/:id',
        exact: true,
        component: () => <EditStory />
    },
    {
        path: '/users',
        exact: true,
        component: () => <Users />
    },
    {
        path: '/users/create',
        exact: true,
        component: () => <CreateUser />
    },
    {
        path: '/users/edit/:id',
        exact: true,
        component: () => <EditUser />
    },
    {
        path: '/organizations',
        exact: true,
        component: () => <Organizations />
    },
    {
        path: '/organizations/create',
        exact: true,
        component: () => <CreateOrganization />
    },
    {
        path: '/organizations/edit/:id',
        exact: true,
        component: () => <EditOrganization />
    },
    {
        path: '*',
        component: () => <NotFound />
    },

];

export default routes;