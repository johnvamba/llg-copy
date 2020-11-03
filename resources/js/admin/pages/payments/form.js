import React from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';

const PaymentForm = ({ closeForm }) => {
    return(
        <>
            <section className="payment-form create-form">
                <header className="create-story__header">
                    <h2>Add Payment</h2>
                    <button type="button" onClick={() => closeForm(false)}>
                        <OffersFormCross />
                    </button>
                </header>
            </section>
        </>
    )
}

export default PaymentForm;