import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useLocation, Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import mainBackground from '../../assets/images/login-2.jpg';
import LoadingScreen from '../components/LoadingScreen'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { loadStripe } from '@stripe/stripe-js';
import {
    // CardElement,
    Elements,
    CardNumberElement,
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
import StripeElement from './stripeelement'
import axios from 'axios'

const auth_token = Cookie.get('oToken_admin') || Cookie.get('oToken_org_admin');

const PublicPayment = () => {
    const [countTab, setCountTab] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [amount, setAmount] = useState(0);
    const [stripePromise, setStripePromise] = useState(null);
    const [paymentSuccess, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [need, setNeed] = useState({})
    const [authtoken, setAuthToken] = useState(false)
    const [axiosState, setAxiosState] = useState(null);
    const [amountType, setAmountType] = useState('fixed');
    const [total, setTotal] = useState(0);
    const [cardHolder, setCardHolder] = useState(null);
    const location = useLocation();

    // const [card, setCard] = useState('');
    // const stripe = useStripe();

    // const elements = useElements();

    useEffect(() => {
        console.log('somethign');
        const url = new URL(window.location.href)
        const need_id = url.searchParams.get('need_id');
        const auth = url.searchParams.get('token') || auth_token;
        console.log('auth', url.searchParams.get('token'), auth_token)
        if (need_id && auth) {
            setAuthToken(auth);
            loadAll(need_id, auth);
        }
        // if(!email || EmailValidator(email) != ''){
        //     set.email = 'We could not proceed without a proper email';
        //     setErrors({...errors, ...set})
        //     return ;
        // }
    }, [location])

    // useEffect(()=>{
    //     if(!stripe) {
    //         return;
    //     }
    // }, [stripe])

    const changeDonationType = (charge = amount, type) => {
        if (type == 'percentage') {
            setAmount(charge);
            setAmountType('percentage');

            if (need.hasOwnProperty('goal')) {
                let amnt = need.goal * (amount / 100);
                setTotal(parseFloat(amnt).toFixed(2));
            }
        } else {
            setAmount(charge);
            setAmountType('fixed');
            setTotal(charge);
        }
    }

    const loadAll = (need_id, auth) => {
        //User cred from api
        // console.log(axios, need_id, auth);
        setLoading(true)
        axios.get('/api/payneed', {
            params: {
                need: need_id
            },
            headers: {
                Authorization: `Bearer ${auth}`
            }
        }).then(({ data }) => {
            setNeed(data.data)

            if (data.data.type == 'Donation') {
                setAmount(data.data.goal);
                setTotal(data.data.goal);
            } else {
                setAmount(50);
                setTotal(50);
            }

            if (data.data.pk) {
                /*stripe.setOptions({
                    publishableKey:data.data.pk 
                })*/
                setStripePromise(loadStripe(data.data.pk));
            }
        }).catch(({ response, request }) => {
            if (response) {
                setErrors([response.error])
            }

            if (request) {
                setErrors(['Could not connect to Neuma Care']);
            }
        }).finally(() => {
            setLoading(false);
        })
        //organization
        //need
    }

    const submitPaymentReference = () => {

    }

    const handleGoBack = (status) => {
        let params = { status };

        if (status === 'success') {
            params.amount = amount;
        }

        window.ReactNativeWebView.postMessage(JSON.stringify(params));
    }

    const presubmit = async (elements) => {
        // event.preventDefault()

        setSubmitting(true);
        const stripe = await stripePromise.then(stripe => stripe)
        const { token, error } = await stripe.createToken(elements.getElement(CardNumberElement));
        console.log('stripePromise', stripePromise, token, error, stripe);
        if (token) {
            axios.post(`api/payment/need/${need.id}`, {
                amount: parseFloat(total),
                name: cardHolder,
                token: token.id
            }, {
                headers: {
                    Authorization: `Bearer ${authtoken}`
                }
            }).then(() => {
                setSubmitting(false)
                setSuccess(true)
                swal.fire({
                    text: `You successfully donated to need ${need.title}`,
                    imageUrl: PopupLogo,
                    title: 'Payment successful!',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                    onClose: () => {
                        // window.location = '/login';
                    }
                })
            }).catch(({ response, request }) => {
                setSubmitting(false)
                if (response) {
                    setErrors([response.error])
                }

                if (request) {
                    setErrors(['Could not make transaction to Need']);
                }
            })
        } else if (error) {
            setErrors([error.message]);
        }
    }

    if (paymentSuccess)
        return (<section className="create-org-pub flex items-center justify-center" style={{ backgroundImage: `url(${mainBackground})` }}>
            <section className="create-org-pub__container">
                <section className="w-full h-full p-5">
                    <div className="offers-create-form__header">
                        <h2>Thank you!!</h2>
                    </div>
                    <div className={`create-org-pub__footer create-org-pub__footer-cols-2`}>
                        <div>
                            <button className="primary-btn" onClick={() => handleGoBack('success')}>Go back.</button>
                        </div>
                    </div>
                </section>
            </section>
        </section>)

    if ((_.isEmpty(need) || errors.length > 0) && !loading)
        return (<section className="create-org-pub flex items-center justify-center" style={{ backgroundImage: `url(${mainBackground})` }}>
            <section className="create-org-pub__container">
                <section className="w-full h-full p-5">
                    <div className="offers-create-form__header">
                        <h2>Could not proceed with donation</h2>
                        <p>Missing User Credentials, Neuma Need or Organisation Stripe ID</p>
                        {
                            errors.map((i, k) => <p key={`error-${k}`}>{i}</p>)
                        }
                    </div>
                    <div className={`create-org-pub__footer create-org-pub__footer-cols-2`}>
                        <div>
                            <button className="primary-btn" onClick={() => handleGoBack('cancel')}>Go back.</button>
                        </div>
                    </div>
                </section>
            </section>
        </section>)


    return (
        <div className="w-full h-full">
            <Elements stripe={stripePromise}>
                <StripeElement 
                    need={need} 
                    loading={loading} 
                    stripePromise={stripePromise} 
                    presubmit={presubmit} 
                    amount={amount} 
                    setAmount={setAmount} 
                    amountType={amountType}
                    setAmountType={changeDonationType}
                    total={total}
                    setTotal={setTotal}
                    cardHolder={cardHolder}
                    setCardHolder={setCardHolder}
                    errors={errors} 
                    onClose={handleGoBack}
                />
            </Elements>
        </div>
        // <section className="create-org-pub flex items-center justify-center" style={{ backgroundImage: `url(${mainBackground})` }}>
        //     <section className="create-org-pub__container">
        //         {submitting && <LoadingScreen title="Submitting Checkout" />}
        //         <section className={`w-full h-full ${!loading && 'p-5'}`}>
        //             <Elements stripe={stripePromise}>
        //                 <StripeElement need={need} loading={loading} stripePromise={stripePromise} presubmit={presubmit} amount={amount} setAmount={setAmount} errors={errors} />
        //             </Elements>
        //         </section>
        //     </section>
        // </section>
    )
}

export default PublicPayment;