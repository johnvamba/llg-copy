import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useLocation, Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import mainBackground from '../../assets/images/login-2.jpg';
import LoadingScreen from '../components/LoadingScreen'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import {loadStripe} from '@stripe/stripe-js';
import {
  // CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
const swal = withReactContent(Swal);
import SwalIcon from '../svg/swal-icon'
import { swalError } from '../components/helpers/alerts'
import { validateEmail, isValidated } from '../components/helpers/validator'
import './payment.css';
import '../organisation-public/org-pub.css';
import CurrencyInput from 'react-currency-input-field';
import 'pretty-checkbox';

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};
const logEvent=(event)=>{
    console.log(event)
}

const PublicPayment = () => {
    const [countTab, setCountTab] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState(0);
    const [stripePromise, setStripePromise] = useState(loadStripe('pk_test_51IWDA6C7YAX5QqxRxGCpT7mGtLsIXGXFu66KsIhWnD0ewSlHgblJXfQCHh8HHneK6lVFjx7CXqbUc5zUQvdlFXAz00pcbG8gHr'));
    const [paymentSuccess, setSuccess] = useState(false);
    const [need, setNeed] = useState({})
    const location = useLocation();

    // const [card, setCard] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(()=>{
        const url = new URL(window.location.href)
        const need_id = url.searchParams.get('need_id');
        const auth = url.searchParams.get('auth');

        // if(!email || EmailValidator(email) != ''){
        //     set.email = 'We could not proceed without a proper email';
        //     setErrors({...errors, ...set})
        //     return ;
        // }
    }, [location])

    useEffect(()=>{
        if(!stripe) {
            return;
        }
        // const pr = stripe.paymentRequest({

        // })
    }, [stripe])

    const loadAll = (need_id, auth) => {

        //User cred from api
        //organization
        //need
    }

    const submitPaymentReference = ()=>{

    }

    const presubmit = async (event) => {
        event.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if(error) {

        } else {
            console.log('Payment method', paymentMethod)
        }
    }
    if(_.isEmpty(need) && !loading) 
        return (<section className="create-org-pub flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
            <section className="create-org-pub__container">
                <section className="w-full h-full p-5">
                    <div className="offers-create-form__header">
                        <h2>Could not proceed with donation</h2>
                        <p>Missing User Credentials, Neuma Need or Organisation Stripe ID</p>
                    </div>
                    <div className={`create-org-pub__footer create-org-pub__footer-cols-2`}>
                        <div>
                            <button className="primary-btn" onClick={()=>window.close()}>Go back.</button>
                        </div>
                    </div>
                </section>
            </section>
        </section>)


    return (
        <section className="create-org-pub flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
            <section className="create-org-pub__container">
                <section className="w-full h-full p-5">
                    {
                        loading ? <LoadingScreen title="Loading Credentials"/> :
                        <Elements stripe={stripePromise}>
                            <form onSubmit={presubmit}> 
                                <div className="offers-create-form__header">
                                    <h2>Make a Donation</h2>
                                </div>

                                <div className={`form-group`}>
                                    <label>Need Details</label> 
                                    <div className="card-details">
                                        <div className="flex mb-1">
                                            <div className="flex-grow-1">
                                                <h4 className="card-title">{need.need_title || 'missing-title'}</h4>
                                                <h5 className="card-subtitle">
                                                    {
                                                        need.org_photo &&
                                                        <span className="photo" style={{backgroundImage: `url(${need.org_photo})`}}/>
                                                    }
                                                    {need.org_name || 'missing-org'}
                                                </h5>
                                            </div>
                                            {
                                                need.need_photo &&
                                                <img className="need-image" style={{backgroundImage: `url(${need.need_photo})`}}/>
                                            }
                                        </div>
                                        <label className="about mb-1">About</label>
                                        <p className="details">{need.need_desc}</p>
                                        <div className="progress mb-1">
                                            <div className="progress-bar" style={{width: `${need.raised /(need.goal != 0 ? need.goal : 1)}%`}}></div>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="raised">Raised: $ {need.raised}</p>
                                            <p>Goal: $ {need.goal}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='offers-create-form__body'>
                                    <div className="flex flex-wrap ">
                                        <div className="w-full">
                                            <div className={`form-group ${errors.name && 'form-error'}`}>
                                                <label>Amount</label>
                                                <div className="input-container">
                                                    <span className="currency">$</span>
                                                    <CurrencyInput
                                                      id="input-example"
                                                      className="input-field space-l"
                                                      name="amount"
                                                      placeholder="value"
                                                      value={amount}
                                                      decimalsLimit={2}
                                                      onValueChange={setAmount}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className={`form-group ${errors.name && 'form-error'}`}>
                                                <label htmlFor="cardNumber">Card Number</label>
                                                <CardNumberElement
                                                    id="cardNumber"
                                                    onBlur={logEvent('blur')}
                                                    onChange={logEvent('change')}
                                                    onFocus={logEvent('focus')}
                                                    onReady={logEvent('ready')}
                                                    options={ELEMENT_OPTIONS}
                                                  />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className={`form-group ${errors.name && 'form-error'}`}>
                                                <label  htmlFor="expiry">Expiry Date</label>
                                                <CardExpiryElement
                                                    id="expiry"
                                                    onBlur={logEvent('blur')}
                                                    onChange={logEvent('change')}
                                                    onFocus={logEvent('focus')}
                                                    onReady={logEvent('ready')}
                                                    options={ELEMENT_OPTIONS}
                                                  />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className={`form-group ${errors.name && 'form-error'}`}>
                                                <label htmlFor="cvc">CVC</label>
                                                <CardCvcElement
                                                    id="cvc"
                                                    onBlur={logEvent('blur')}
                                                    onChange={logEvent('change')}
                                                    onFocus={logEvent('focus')}
                                                    onReady={logEvent('ready')}
                                                    options={ELEMENT_OPTIONS}
                                                  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`create-org-pub__footer create-org-pub__footer-cols-2`}>
                                        <div>
                                            <button className="primary-btn" type="submit" disabled={!stripe}>Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Elements>
                    }
                </section>
            </section>
        </section>
    )
}

export default PublicPayment;