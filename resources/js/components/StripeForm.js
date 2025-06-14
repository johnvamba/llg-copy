import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState({});

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const response = await stripe.createToken(cardElement);
        console.log(response);
        // if (error) {
        //     console.log('[error]', error);
        //     setError(error);
        // } else {
        //     console.log('[PaymentMethod]', paymentMethod);
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && 
                <p>{error.message}</p> 
            }
            
            <CardElement 
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default StripeForm;