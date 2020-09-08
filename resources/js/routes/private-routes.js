import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';

const oToken = Cookie.get('oToken_admin');

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            oToken ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;