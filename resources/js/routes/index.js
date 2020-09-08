import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import PublicRoutes from './public-routes'
import Login from '../auth/Login'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'

import PrivateRoute from './private-routes'
import Home from '../admin/app';
import NotFound from '../components/NotFound';

const AppRoute = () => {

    return (
        <Switch>
            <PublicRoutes exact path="/" component={Login}/>
            <PublicRoutes exact path="/login" component={Login}/>
            <PublicRoutes exact path="/forgot-password" component={ForgotPassword}/>
            <PublicRoutes exact path="/reset-password" component={ResetPassword}/>

            <PrivateRoute path="/admin" component={Home}/>

            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default AppRoute;