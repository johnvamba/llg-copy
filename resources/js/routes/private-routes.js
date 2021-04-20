import React, { useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import Cookie from 'js-cookie';

const oToken = Cookie.get('oToken_admin');

const PrivateRoute = ({component: Component, ...rest}) => {
	const loc = useLocation();
	useEffect(()=>{
		if(!oToken && loc.pathname != '/login') {
			Cookie.set('pathname', loc.pathname, {expires: 1})
		}
	}, [loc]);

	// console.log('rest?', rest)
    return (
        <Route {...rest} render={props => (
            oToken ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;