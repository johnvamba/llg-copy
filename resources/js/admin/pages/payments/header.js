import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const PaymentHeader = ({ count = 0, setShowAdd }) => {
    return(
        <section className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
            <div className="header-title flex flex-1">
                <h1>Payment List ({count})</h1>
            </div>
            <div className="flex flex-1 justify-end">
                {/*<button className="flex rounded-sm" onClick={() => setShowAdd(true)}>
                    <OffersPlus />
                    <span>Add Payment</span>
                </button>*/}
            </div>
        </section>
    )
}


export default PaymentHeader;