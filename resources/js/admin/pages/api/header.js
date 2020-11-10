import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const ApiHeader = ({ setShowCreate }) => {
    return(
        <>
            <section className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>API</h1>
                </div>
                <div className="flex flex-1 justify-end">
                    <button className="page-header-btn flex rounded-sm" onClick={() => setShowCreate(true)}>
                        <OffersPlus />
                        <span className="page-header-btn__text">Create API Key</span>
                    </button>
                </div>
            </section>
        </>
    )
}


export default ApiHeader;