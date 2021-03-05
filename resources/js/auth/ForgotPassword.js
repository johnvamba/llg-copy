import React, {useState, useCallback} from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {Link} from 'react-router-dom';
import formBackground from '../../assets/images/login-1.png';
import mainBackground from '../../assets/images/login-2.jpg';
import Logo from '../svg/logo';
import './auth.css';
import { swalSuccess, swalError } from '../components/helpers/alerts';

const ForgotPassword = () => {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState(null);
    const [sent, setSent] = useState(false);
    const [submitting, setSubmit] = useState(false);

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = () => {
        setSubmit(true)
        api.post('/api/password/forget', {
            email
        }).then(({data})=>{
            setSent(true)
            setSubmit(false)
        }).catch(errors => {
            setErrors(errors)
            swalError('Missing account using email')
            setSubmit(false)
        })
    }

    return (
        <section className="login forgot-pass flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
            <section className="login__container">
                <img src={formBackground} />
                <section className="left">
                    <Logo />
                    {
                        sent ? <form>
                            <div className="py-10 text-center">
                                <h2 className="forgot-pass__h2">
                                    Password Reset Link Sent
                                </h2>
                                <p className="forgot-pass__p">
                                    We've sent to your email a link to reset your password.
                                </p>
                            </div>
                        </form> 
                        : <form>
                            <Link className="text-sm text-gray-500 inline-flex items-center" to="/">
                                <i className="forgot-pass__i fa fa-angle-left mr-2" aria-hidden="true"></i>
                                <span className="forgot-pass__back">Go Back</span>
                            </Link>
                            <div className="py-10 text-center">
                                <h2 className="forgot-pass__h2">
                                    Forgot your password?
                                </h2>
                                <p className="forgot-pass__p">
                                    Type in the email you registered and we will
                                    send you a password reset link.
                                </p>
                            </div>
                            <div className="form-group">
                                <label>
                                    Email
                                </label>
                                
                                <input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email || ``}
                                    placeholder="Email address"
                                    onChange={handleChange}
                                    errors={errors}
                                    labelstyle="font-semibold"
                                />
                            </div>
                            <Button
                                type="button"
                                className="w-full primary-btn"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {
                                    submitting ? 'Sending' : 'Send'
                                }
                            </Button>
                            <p className="forgot-pass__p forgot-pass__p--gray">
                                Did you remember your password?&nbsp;
                                <span>
                                    <Link className="forgot-pass__link" to="/">
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

export default ForgotPassword;