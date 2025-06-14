import React from 'react';
import Dashboard from '../pages/dashboard';
import Needs from '../pages/needs';
import Requests from '../pages/needs/request';
import CreateNeeds from '../pages/needs/create';
import EidtNeeds from '../pages/needs/edit';
import NeedsCategory from '../pages/needs-category';
import CreateNeedsCategory from '../pages/needs-category/create';
import EditNeedsCategory from '../pages/needs-category/edit';
import Users from '../pages/users';
import CreateUser from '../pages/users/create';
import EditUser from '../pages/users/edit';
import Offers from '../pages/offers';
import OfferRequests from '../pages/offers/requests';
import EditOffer from '../pages/offers/edit';
import Stories from '../pages/stories';
// import StoriesDrafts from '../pages/stories/drafts';
import EditStory from '../pages/stories/edit';
import Groups from '../pages/groups';
import CreateGroup from '../pages/groups/create';
import EditGroup from '../pages/groups/edit';
import Organizations from '../pages/organizations';
import Campus from '../pages/campus';
import CreateOrganization from '../pages/organizations/create';
import EditOrganization from '../pages/organizations/edit';
import PushNotification from '../pages/push-notification';
import Transactions from '../pages/transactions';
import Payments from '../pages/payments';
import Api from '../pages/api';
import ReceiptTemplate from '../pages/payments/receipt-template';
import InviteMember from '../pages/invite-member';
import NotFound from '../../components/NotFound';

const routes = [
    {
        path: '/',
        exact: true,
        component: (props) => <Dashboard {...props}/>
    },
    {
        path: '/dashboard',
        exact: true,
        component: (props) => <Dashboard {...props}/>
    },
    {
        path: '/needs',
        exact: true,
        component: () => <Needs />
    },
    {
        path: '/needs/requests',
        exact: true,
        component: () => <Requests />
    },
    // {
    //     path: '/needs/create',
    //     exact: true,
    //     component: () => <CreateNeeds />
    // },
    // {
    //     path: '/needs/edit/:id',
    //     exact: true,
    //     component: () => <EidtNeeds />
    // },
    // {
    //     path: '/needs/category',
    //     exact: true,
    //     component: () => <NeedsCategory />
    // },
    // {
    //     path: '/needs/category/create',
    //     exact: true,
    //     component: () => <CreateNeedsCategory />
    // },
    // {
    //     path: '/needs/category/edit/:id',
    //     exact: true,
    //     component: () => <EditNeedsCategory />
    // },
    {
        path: '/offers',
        exact: true,
        component: () => <Offers />
    },
    {
        path: '/offers/requests',
        exact: true,
        component: () => <OfferRequests />
    },
    // {
    //     path: '/offers/edit/:id',
    //     exact: true,
    //     component: () => <EditOffer />
    // },
    {
        path: ['/stories', '/stories/drafts', '/stories/submissions'],
        exact: true,
        component: () => <Stories />
    },
    // {
    //     path: '/stories/drafts',
    //     exact: true,
    //     component: () => <Stories />
    // },
    // {
    //     path: '/stories/edit/:id',
    //     exact: true,
    //     component: () => <EditStory />
    // },
    {
        path: '/users',
        exact: true,
        component: () => <Users />
    },
    // {
    //     path: '/users/create',
    //     exact: true,
    //     component: () => <CreateUser />
    // },
    // {
    //     path: '/users/edit/:id',
    //     exact: true,
    //     component: () => <EditUser />
    // },
    {
        path: '/groups',
        exact: true,
        component: () => <Groups />
    },
    // {
    //     path: '/groups/create',
    //     exact: true,
    //     component: () => <CreateGroup />
    // },
    // {
    //     path: '/groups/edit/:id',
    //     exact: true,
    //     component: () => <EditGroup />
    // },
    {
        path: ['/organisations', '/organisations/requests', '/organisations/requests/:id'],
        exact: true,
        component: (props) => <Organizations {...props}/>
    },
    // {
    //     path: '/organizations/create',
    //     exact: true,
    //     component: () => <CreateOrganization />
    // },
    // {
    //     path: '/organizations/edit/:id',
    //     exact: true,
    //     component: () => <EditOrganization />
    // },
    {
        path: '/transactions',
        exact: true,
        component: () => <Transactions />
    },
    {
        path: '/payments',
        exact: true,
        component: () => <Payments />
    },
    {
        path: '/payments/receipt-templates',
        exact: true,
        component: () => <ReceiptTemplate />
    },
    {
        path: '/api',
        exact: true,
        component: () => <Api />
    },
    {
        path: '/organisations/:id/invite',
        exact: true,
        component: () => <InviteMember />
    },
    {
        path: '/campus',
        exact: true,
        component: () => <Campus />
    },
    {
        path: ['/notifications', '/notifications/sent', '/notifications/scheduled'],
        exact: true,
        component: () => <PushNotification />
    },
    {
        path: '*',
        component: () => <NotFound />
    },

];

export default routes;