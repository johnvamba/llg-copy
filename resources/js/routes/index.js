import React, {lazy} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'

const RootRoute = () => (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/forgot-password" component={ForgotPassword}/>
    </Switch>
)

export default RootRoute;