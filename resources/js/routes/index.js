import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Login from '../auth/Login'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'

import PrivateRoute from './private-routes'
import Home from '../admin/app';
import NotFound from '../components/NotFound';

const AppRoute = () => {

    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/reset-password" component={ResetPassword}/>

            <PrivateRoute path="/admin" component={Home}/>

            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default AppRoute;