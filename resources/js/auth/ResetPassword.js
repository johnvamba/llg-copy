import React, { useState, useCallback, useEffect } from 'react';
import Button from '../components/Button';
import { Link, useLocation, useHistory } from 'react-router-dom';
import formBackground from '../../assets/images/login-1.png';
import mainBackground from '../../assets/images/login-2.jpg';
import Logo from '../svg/logo';
import { swalSuccess } from '../components/helpers/alerts';

import './auth.css';

import 'pretty-checkbox';

const ResetPassword = () => {
    const [form, setForm] = useState({});
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState('');
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    });
    const [errors, setErrors] = useState({});
    const [token, setToken] = useState(null);
    const [submitting, setSubmit] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const url = new URL(window.location.href)
        const email = url.searchParams.get('email');
        const token = url.searchParams.get('token');

        if(token && email){
            setEmail(email)
            setToken(token)
        }
    }, [location]);

    const handleChange = (event) => {
        let inputs = { ...form };
        inputs[event.target.name] = event.target.value;
        setForm(inputs);
    }

    const handleSubmit = async () => {
        setSubmit(true)
        api.post('/api/password/reset', {
            token, 
            email, 
            ...form
        }).then(() => {
            setSubmit(false)
            swalSuccess('Password has been reset!')
            history.push('/login')
        }).catch(err => {
            console.log('errors', err)
        })
    }

    const handleShowPassword = async(key) => {
        let secure = {...show};
        secure[key] = !secure[key];
        setShow(secure);
    }

    return (
        <section className="login forgot-pass flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
            <section className="login__container">
                <img src={formBackground} />
                <section className="left">
                    <Logo />
                    {
                        token ?
                        <form>
                            <div className="pb-10 text-center">
                                <h2 className="forgot-pass__h2">
                                    Reset your password
                                </h2>
                                <p className="forgot-pass__p">
                                    Fill up your new password
                                </p>
                            </div>
                            <div className="form-group">
                                <label>
                                    New Password
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
                                    <button type="button" className="focus:outline-none" onClick={()=>handleShowPassword('password')}>
                                        {show.password ?
                                            <i className="fa fa-eye-slash text-gray-500" aria-hidden="true"></i>
                                            :
                                            <i className="fa fa-eye text-gray-600" aria-hidden="true"></i>
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>
                                    Repeat Password
                                </label>
                                <input
                                    name="password_confirmation"
                                    type={show.confirmPassword ? 'text' : 'password'}
                                    value={form.password_confirmation || ``}
                                    placeholder="********"
                                    onChange={handleChange}
                                    className="w-full border-b border-t-0 border-l-0 
                                    border-r-0 border-grey-dark 
                                    focus:outline-none focus:border-blue-300"
                                />
                                <div className={`absolute inset-y-0 right-0 pr-2 flex items-end text-sm leading-7`}>
                                    <button type="button" className="focus:outline-none" onClick={()=>handleShowPassword('confirmPassword')}>
                                        {show.confirmPassword ?
                                            <i className="fa fa-eye-slash text-gray-500" aria-hidden="true"></i>
                                            :
                                            <i className="fa fa-eye text-gray-600" aria-hidden="true"></i>
                                        }
                                    </button>
                                </div>
                            </div>
                            <Button
                                type="button"
                                className="w-full primary-btn"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {
                                    submitting ? 'Submitting' :'Reset'
                                }
                            </Button>
                        </form> :
                        <form>
                            <div className="pb-10 text-center">
                                <h2 className="forgot-pass__h2">
                                    Reset your password
                                </h2>
                                <p className="forgot-pass__p">
                                    Missing token or email
                                </p>
                            </div>

                            <p className="forgot-pass__p forgot-pass__p--gray">
                                Did you remember your password?&nbsp; 
                                <span>
                                    <Link className="forgot-pass__link" to="/login">
                                        Try logging in
                                    </Link>
                                </span>
                            </p>
                        </form>
                    }
                </section>
            </section>
        </section>
    )
}

export default ResetPassword;