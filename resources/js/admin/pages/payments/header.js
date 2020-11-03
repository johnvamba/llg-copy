import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const PaymentHeader = ({ setShowAdd }) =>{
    return(
        <>
            <section className="push-notif-header offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>Payment List (7)</h1>
                </div>
                <div className="flex flex-1 justify-end">
                    <button className="flex rounded-sm" onClick={() => setShowAdd(true)}>
                        <OffersPlus />
                        <span>Add Payment</span>
                    </button>
                </div>
            </section>
        </>
    )
}


export default PaymentHeader;