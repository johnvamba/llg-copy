import './bootstrap'
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AppRoute from './routes/';

const stripePromise = loadStripe(`${process.env.MIX_STRIPE_PUBLISHABLE_KEY}`);

const Root = () => {
    return (
        <Provider store={store}>
            <Elements stripe={stripePromise}>
                <BrowserRouter>
                    <Route component={AppRoute} />
                </BrowserRouter>
            </Elements>
        </Provider>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<Root />, document.getElementById('app'));
}