import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const PushHeader = ({ setShowCreate }) =>{
    return(
        <>
            <section className="push-notif-header offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <ul className="flex items-center">
                    <li className="active">
                        <label>All (7)</label>
                    </li>
                    <li>
                        <label>Scheduled (5)</label>
                    </li>
                    <li>
                        <label>Sent (2)</label>
                    </li>
                </ul>
                <div className="flex flex-1 justify-end">
                    <button className="flex rounded-sm" onClick={() => setShowCreate(true)}>
                        <OffersPlus />
                        <span>Add Campus</span>
                    </button>
                </div>
            </section>
        </>
    )
}


export default PushHeader;