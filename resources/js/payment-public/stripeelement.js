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

const StripeElement = ({need, stripePromise, presubmit, loading, amount, setAmount, errors, submitting = false })=> {
    const elements = useElements();

	if(loading)
		return <LoadingScreen title="Loading Credentials"/>

	return <form> 
            <div className="offers-create-form__header">
                <h2>Make a Donation</h2>
            </div>

            <div className={`form-group`}>
                <label>Need Details</label> 
                <div className="card-details">
                    <div className="flex mb-1">
                        <div className="flex-grow-1">
                            <h4 className="card-title">{need.title || 'missing-title'}</h4>
                            <h5 className="card-subtitle">
                                {need.organization && (need.organization.label || 'missing-org')}
                            </h5>
                        </div>
                        {
                            need.photo &&
                            <img className="need-image" style={{backgroundImage: `url(${need.photo})`}}/>
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
                        <div className={`form-group`}>
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
                            <label  htmlFor="expiry">Expiry Date</label>
                            <CardExpiryElement
                                id="expiry"
                                options={ELEMENT_OPTIONS}
                              />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className={`form-group`}>
                            <label htmlFor="cvc">CVC</label>
                            <CardCvcElement
                                options={ELEMENT_OPTIONS}
                              />
                        </div>
                    </div>
                </div>
                {
                    errors.length > 0 && errors.map((i,k)=><p className="text-red-400" key={`error-${k}`}>{i}</p>)
                }
                <div className={`create-org-pub__footer create-org-pub__footer-cols-2`}>
                    <div>
                        <button className="primary-btn" type="button" onClick={()=>presubmit(elements)} disabled={!stripePromise || submitting}>Checkout</button>
                    </div>
                </div>
            </div>
        </form>
}

export default StripeElement