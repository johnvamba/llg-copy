import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

const Content = () => {
    
    return (
        <div className="relative flex-1 overflow-auto p-12 bg-gray-100">
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
        </div>
    )
}

export default Content;