import './bootstrap'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import RootRoute from './routes/';

const Root = () => {
    return (
        <BrowserRouter>
            <Route component={RootRoute} />
        </BrowserRouter>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<Root />, document.getElementById('app'));
}