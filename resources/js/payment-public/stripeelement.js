import React from 'react'
import {
    // CardElement,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import CurrencyInput from 'react-currency-input-field';
import LoadingScreen from '../components/LoadingScreen'
// import CurrencyInput from 'react-currency-input';


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

const logEvent = (event) => {
    console.log(event)
}

const StripeElement = ({
    need,
    stripePromise,
    presubmit,
    loading,
    amount,
    setAmount,
    amountType,
    setAmountType,
    total,
    setTotal,
    cardHolder,
    submitting,
    setCardHolder,
    errors,
    onClose
}) => {

    const elements = useElements();

    if (loading)
        return <LoadingScreen title="Loading Credentials" />

    const onChangeDonationType = (charge = amount, type) => {
        if (charge == '' && type == 'percentage') {
            charge = 0;
        }
        setAmountType(charge, type)
        console.log('updating', charge, type)
    }

    const progress = () => {
        return (Math.floor(need.raised * 100) / need.goal).toFixed(2) + '%';
    }

    return (
        <form>
            <div className="info_container px-3 pt-3 pb-3 pt-5">
                {/* <div className="flex flex-row items-center offers-create-form__header py-3">
                    <div className="flex-1"></div>
                    <div className="flex-1 text-center">
                        <h2 className="text-white">Make a Donation</h2>
                    </div>
                    <div className="flex-1 text-right">
                        <i className="fa fa-times text-white text-xl mr-2" aria-hidden="true" onClick={() => onClose('cancel')}></i>
                    </div>
                </div> */}
                <div className="offers-create-form__header py-3">
                    <h2 className="text-white text-center">Make a Donation</h2>
                </div>

                <div className={`form-group`}>
                    <div>
                        <div className="flex mb-3">
                            <div className="flex-grow-1">
                                <h4 className="card-title text-white">{need.title || 'missing-title'}</h4>
                                <h5 className="card-subtitle text-gray-200 text-sm">
                                    by {need.organization && (need.organization.label || 'missing-org')}
                                </h5>
                            </div>
                            {
                                need.photo &&
                                <img className="need-image" style={{ backgroundImage: `url(${need.photo})` }} />
                            }
                        </div>
                        {/* <label className="about mb-1">About</label>
                        <p className="details overflow-ellipsis">{need.description}</p> */}
                        <div className="progress mb-1">
                            {/* <div className="progress-bar" style={{ width: `${need.raised / (need.goal != 0 ? need.goal : 1)}%` }}></div> */}
                            <div className="progress-bar" style={{ width: progress() }}></div>
                        </div>
                        <div className="flex justify-between">
                            <p className="raised text-white">Raised: $ {need.raised}</p>
                            <p className="text-white">Goal: $ {need.goal}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='offers-create-form__body px-3'>
                <div className="flex flex-wrap ">
                    <div className="w-full">
                        <div className={`form-group`}>
                            <label>Donation Amount</label>
                            {need.type == 'Fundraise' ? (
                                <div className="input-container">
                                    <CurrencyInput
                                        id="input-example"
                                        className="input-field"
                                        name="amount"
                                        placeholder="value"
                                        value={amount}
                                        decimalsLimit={2}
                                        onValueChange={(value) => onChangeDonationType(value, amountType)}
                                    /> 
                                    <span
                                        onClick={() => onChangeDonationType(10, 'percentage')}
                                        className={`absolute right-0 border ${amountType == 'percentage' && 'active-donation-type'}  rounded-full py-2 px-3`}
                                    >%</span>
                                    <span
                                        onClick={() => onChangeDonationType(50, 'fixed')}
                                        className={`absolute right-0 border ${amountType == 'fixed' && 'active-donation-type'} border-gray-400 rounded-full py-2 px-3 mr-12`}
                                    >$</span>
                                </div>
                            ) : (
                                <div className="input-container">
                                    <h3>$ {need.goal}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <div className={`form-group`}>
                            <label htmlFor="cardNumber">Card Number</label>
                            <CardNumberElement
                                id="cardNumber"
                                options={ELEMENT_OPTIONS}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className={`form-group`}>
                            <label htmlFor="expiry">Expiry Date</label>
                            <CardExpiryElement
                                id="expiry"
                                options={ELEMENT_OPTIONS}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className={`form-group border-b border-gray-400`}>
                            <label htmlFor="expiry">Name on Card</label>
                            <input
                                defaultValue={cardHolder}
                                value={cardHolder}
                                onChange={e => setCardHolder(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className={`form-group border-b border-gray-400`}>
                            <label htmlFor="cvc">Security Code (CVV)</label>
                            <CardCvcElement
                                options={{ placeholder: 'CVV', ...ELEMENT_OPTIONS }}
                            />
                        </div>
                    </div>
                </div>
                {
                    errors.length > 0 && errors.map((i, k) => <p className="text-red-400" key={`error-${k}`}>{i}</p>)
                }
            </div>

            <div className="px-3 py-4">
                <div className="flex justify-between py-4">
                    <p className="raised text-base">Total Charge: </p>
                    <p className="text-base">$ {total}</p>
                </div>
                <div>
                    <button
                        className="primary-btn w-full rounded-lg p-2 text-base"
                        type="button"
                        onClick={() => presubmit(elements)}
                        disabled={!stripePromise || submitting}
                    >Checkout</button>
                </div>
            </div>
        </form>
    )
}

export default StripeElement