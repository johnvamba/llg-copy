import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import { Switch, Route, Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import Logo from '../svg/logo';
import formBackground from '../../assets/images/login-1.png';
import mainBackground from '../../assets/images/login-2.jpg';

import Login from './Login';
import ForgotPassword from './ForgotPassword';

import './auth.css';

import 'pretty-checkbox';

const AuthIndex = () => {
    return (
        <>
            <section className="login flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
                <section className="login__container">
                    <img src={formBackground} />
                    {/* <Login /> */}
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/login" component={Login} />
                        {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
                    </Switch>
                    {/* <ForgotPassword /> */}
                </section>
            </section>
        </>
    );
}

export default AuthIndex;