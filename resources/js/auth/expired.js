import React, { useState, useCallback, useEffect } from 'react';
import Button from '../components/Button';
import { Link, useLocation, useHistory } from 'react-router-dom';
import formBackground from '../../assets/images/login-1.png';
import mainBackground from '../../assets/images/login-2.jpg';
import Logo from '../svg/logo';
import { swalSuccess } from '../components/helpers/alerts';

import './auth.css';

import 'pretty-checkbox';

const ExpiredLink = () => {
    return (
        <section className="login forgot-pass flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
            <section className="login__container">
                <img src={formBackground} />
                <section className="left">
                    <Logo />
                        <form>
                            <div className="pb-10 text-center">
                                <h2 className="forgot-pass__h2">
                                    Expired Link
                                </h2>
                                <p className="my-5">
                                    The route you're trying to access has expired or intentionally missing.
                                </p>
                            </div>

                            <p className="forgot-pass__p forgot-pass__p--gray">
                                <span>
                                    <Link className="forgot-pass__link" to="/login">
                                        Try logging in
                                    </Link>
                                </span>
                            </p>
                        </form>
                    </section>
            </section>
        </section>
    )
}

export default ExpiredLink;