import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const GroupsHeader = ({ count=0, setShowAdd }) => {
    return (
        <section className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
            <div className="flex flex-1">
                <h1>Groups ({count})</h1>
            </div>
            <div className="flex flex-1 justify-end">
                <button className="primary-btn flex rounded-sm" onClick={() => setShowAdd(true)}>
                    <OffersPlus />
                    <span>Add Group</span>
                </button>
            </div>
        </section>
    )
}
export default GroupsHeader;