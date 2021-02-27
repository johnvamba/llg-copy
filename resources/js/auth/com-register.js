import React, { useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { EmailValidator } from '../utils/helper';
import LoadingScreen from '../components/LoadingScreen';
import { swalSuccess, swalError } from '../components/helpers/alerts';
import {  checkEmail } from '../components/helpers/async_options';

import Cookie from 'js-cookie'
import Logo from '../svg/logo';
import formBackground from '../../assets/images/login-1.png';
import mainBackground from '../../assets/images/login-2.jpg';

import './auth.css';

import 'pretty-checkbox';

const CompleteRegister = () => {
    const [form, setForm] = useState({});
    const location = useLocation();
    const [show, setShow] = useState({ password: false, confirm_password: false });
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [completing, setComplete] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        const url = new URL(window.location.href)
        const email = url.searchParams.get('email');
        const token = url.searchParams.get('token');

        let set = {}
        if(!email || EmailValidator(email) != ''){
            set.email = 'We could not proceed without a proper email';
            setErrors({...errors, ...set})
            return ;
        }

        setToken(token);
        setEmail(email);
    }, [location])

    useEffect(()=>{
        if(email != '' && EmailValidator(email) == '') {
            checkEmail(email, {type: 'user'})
            .then(({data})=>{
                if(email == data.email){
                    if(data.status == 'free'){
                        delete errors.email;
                        setErrors(errors)
                    } else
                        setErrors({...errors, email: 'User already existed'})
                }
            })

        }
    }, [email])

    const handleChange = ({ target }) => setForm({ ...form, [target.name]: target.value });

    const handleShow = (state = false, shown = 'password') => setShow({...show, [shown]: state}) 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.password != form.confirm_password) {
            swalError(`Your passwords are not verified.`);
            return;
        }
        setComplete(true);
        api.post(`/api/account`, {
            ...form,
            email,
            token
        }).then(({data}) => {
            swalSuccess('Account has been created. Please Log in!');
            history.push('/login');
        }).catch(()=>{
            swalError(`We're unable to process your account.`);
        })
    }
    
    if(completing) {
        return (
            <section className="login flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
                <section className="login__container">
                    <img src={formBackground} />
                    <section className="left">
                    <LoadingScreen title="Completing your account"/>
                    </section>
                </section>
            </section>)
    }

    return (
        <section className="login flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
            <section className="login__container">
                <img src={formBackground} />
                {
                    _.isEmpty(errors) ? 
                    <section className="left">
                        <Logo />
                        <h1>Complete Account</h1>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="email-container">
                            <svg className="mr-2" width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5496 0H0.650024L9.09986 6.96006L17.6452 0.0194996C17.6139 0.0103592 17.582 0.0038466 17.5496 0Z" fill="#CF995F"/>
                                <path d="M9.50993 8.3043C9.27045 8.5004 8.9259 8.5004 8.68642 8.3043L0 1.14795V12.3498C0 12.7088 0.291008 12.9998 0.649999 12.9998H17.5496C17.9086 12.9998 18.1996 12.7088 18.1996 12.3498V1.24415L9.50993 8.3043Z" fill="#CF995F"/>
                            </svg>

                            { email }
                            </div>

                            <div className="form-group">
                                <label>
                                    Password
                                </label>

                                <input
                                    name="password"
                                    type={show.password ? 'text' : 'password'}
                                    value={form.password || ``}
                                    placeholder="********"
                                    onChange={handleChange}
                                    className="w-full border-b border-t-0 border-l-0 
                                    border-r-0 border-grey-dark 
                                    focus:outline-none focus:border-blue-300"
                                />
                                <div className={`absolute inset-y-0 right-0 pr-2 flex items-end text-sm leading-7`}>
                                    <button type="button" className="focus:outline-none" onClick={() => handleShow(!show.password)}>
                                        {show.password ?
                                            <i className="fa fa-eye-slash text-gray-500" aria-hidden="true"></i>
                                            :
                                            <i className="fa fa-eye text-gray-600" aria-hidden="true"></i>
                                        }
                                    </button>
                                </div>
                            </div>
                            {errors.password && 
                                <p className="text-red-500 text-xs italic">{errors.password }</p>
                            }

                            <div className="form-group">
                                <label>Confirm Password</label>

                                <input
                                    name="confirm_password"
                                    type={show.confirm_password ? 'text' : 'password'}
                                    value={form.confirm_password || ``}
                                    placeholder="********"
                                    onChange={handleChange}
                                    className="w-full border-b border-t-0 border-l-0 
                                    border-r-0 border-grey-dark 
                                    focus:outline-none focus:border-blue-300"
                                />
                                <div className={`absolute inset-y-0 right-0 pr-2 flex items-end text-sm leading-7`}>
                                    <button type="button" className="focus:outline-none" onClick={() => handleShow(!show.confirm_password, 'confirm_password')}>
                                        {show.confirm_password ?
                                            <i className="fa fa-eye-slash text-gray-500" aria-hidden="true"></i>
                                            :
                                            <i className="fa fa-eye text-gray-600" aria-hidden="true"></i>
                                        }
                                    </button>
                                </div>
                            </div>
                            {errors.confirm_password && 
                                <p className="text-red-500 text-xs italic">{errors.confirm_password }</p>
                            }

                            <Button
                                type="submit"
                                className="w-full primary-btn"
                            >
                                Complete Account
                            </Button>
                        </form>
                    </section> :
                    <section className="left">
                        <Logo />
                        <h1>Warning...</h1>
                        <div className="my-2">
                        {  errors.email }
                        </div>
                        <div className="mt-5">
                        <Link className="forgot-pass__link" to="/login">
                            Try logging in
                        </Link>
                        </div>
                    </section>
                }
            </section>
        </section>
    )
}

export default CompleteRegister;