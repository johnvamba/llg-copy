import './bootstrap'
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import AppRoute from './routes/';

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route component={AppRoute} />
            </BrowserRouter>
        </Provider>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<Root />, document.getElementById('app'));
}