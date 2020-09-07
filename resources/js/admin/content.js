import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

const Content = () => {
    
    return (
        <Switch>
            { routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.component />}
                />
            ))}
        </Switch>
    )
}

export default Content;