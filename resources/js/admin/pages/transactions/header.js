import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const TransactionsHeader = ({ handleForm }) =>{
    return(
        <section className="push-notif-header offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
            <div className="flex flex-1">
                <h1>Transactions</h1>
            </div>
            {/*
            <div className="flex flex-1 justify-end">
                <button className="flex rounded-sm" onClick={() => handleForm({}, true)}>
                    <OffersPlus />
                    <span>Add Transaction</span>
                </button>
            </div>
            */}
        </section>
    )
}


export default TransactionsHeader;