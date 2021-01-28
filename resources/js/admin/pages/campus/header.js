import React from 'react';
import OffersPlus from '../../../svg/offers-plus';
import { useSelector } from 'react-redux';

const CampusHeader = ({ setShowAdd, campus_count = 0 }) => {
    const roles = useSelector(
        state => state.AuthUserReducer.roles
    );
    return(
        <section className="campus-header offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
            <div className="flex flex-1">
                <h1>Location{campus_count > 0 ? ` (${campus_count})` : ''}</h1>
            </div>
            {
                (roles.name === 'admin' || roles.name === 'campus admin') &&
                <div className="flex flex-1 justify-end">
                    <button className="primary-btn flex rounded-sm" onClick={() => setShowAdd(true)}>
                        <OffersPlus />
                        <span>Add Location</span>
                    </button>
                </div>
            }
        </section>
    )
}

export default CampusHeader;