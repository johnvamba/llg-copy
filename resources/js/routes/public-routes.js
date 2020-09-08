import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';

const oToken = Cookie.get('oToken_admin');

const PublicRoutes = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            !oToken ?
                <Component {...props} />
            : <Redirect to="/admin" />
        )} />
    );
};

export default PublicRoutes;