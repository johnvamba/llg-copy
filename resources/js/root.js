import './bootstrap'
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AppRoute from './routes/';
import {messaging} from './services/firebase';

const stripePromise = loadStripe(`${process.env.MIX_STRIPE_PUBLISHABLE_KEY}`);

const Root = () => {

    useEffect(() => {
        async function permission() {
            messaging.requestPermission()
                .then(async() => {
                    const token = await messaging.getToken();
                    console.log(token)
                })
                .catch((err) => {
                    console.log(err)
                });
        }

        permission()
    }, [])

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