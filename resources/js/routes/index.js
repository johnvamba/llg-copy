import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Login from '../auth/Login'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'

const AppRoute = () => (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/forgot-password" component={ForgotPassword}/>
        <Route exact path="/reset-password" component={ResetPassword}/>
    </Switch>
)

export default AppRoute;