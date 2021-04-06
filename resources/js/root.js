import './bootstrap'
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import AppRoute from './routes/';
import { messaging } from './services/firebase';
import Cookie from 'js-cookie'

const Root = () => {

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./firebase-messaging-sw.js")
            .then(function (registration) {
                console.log("Registration successful, scope is:", registration.scope);
            })
            .catch(function (err) {
                console.log("Service worker registration failed, error:", err);
            });
    }

    useEffect(() => {
        if (messaging) {
            async function permission() {
                try {
                    await messaging.requestPermission();
                    if (!Cookie.get('oFCM_token')) {
                        const token = await messaging.getToken();
                        Cookie.set('oFCM_token', token);
                    }
                } catch (err) {
                    console.log("Unable to get permission to notify.", err);
                }
            }
            permission();
        }
    }, []);

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