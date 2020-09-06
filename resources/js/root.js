import './bootstrap'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import AppRoute from './routes/';

const Root = () => {
    return (
        <BrowserRouter>
            <Route component={AppRoute} />
        </BrowserRouter>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<Root />, document.getElementById('app'));
}