import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const OrgHeader = ({ handlePanels, count = 0 }) => {
    return (
        <section className="org-header offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
            <div className="flex flex-1">
                <h1>Organizations{count ? ` (${count})` : ''}</h1>
            </div>
            <div className="flex flex-1 justify-end">
                <button className="flex rounded-sm" onClick={() => handlePanels({}, true)}>
                    <OffersPlus />
                    <span>Add Organization</span>
                </button>
            </div>
        </section>
    )
}
export default OrgHeader;