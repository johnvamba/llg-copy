import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const CampusHeader = ({ setShowAdd, campus_count = 0 }) => {
    return(
        <section className="campus-header offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
            <div className="flex flex-1">
                <h1>Campus{campus_count > 0 ? ` (${campus_count})` : ''}</h1>
            </div>
            <div className="flex flex-1 justify-end">
                <button className="primary-btn flex rounded-sm" onClick={() => setShowAdd(true)}>
                    <OffersPlus />
                    <span>Add Campus</span>
                </button>
            </div>
        </section>
    )
}

export default CampusHeader;