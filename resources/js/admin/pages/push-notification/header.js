import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const PushHeader = ({ tab = 'all', handleTab, handleForm, counts = {} }) =>{
    return(
        <section className="push-notif-header offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
            <ul className="nav-tab">
                <li className={`nav-tab-item ${tab=='all' ? 'active' : ''}`} onClick={()=>handleTab('all')}>All ({ counts.all || 0 })</li>
                <li className={`nav-tab-item ${tab=='scheduled' ? 'active' : ''}`} onClick={()=>handleTab('scheduled')}>Scheduled ({ counts.scheduled || 0 })</li>
                <li className={`nav-tab-item ${tab=='sent' ? 'active' : ''}`} onClick={()=>handleTab('sent')}>Sent ({ counts.sent || 0 })</li>
            </ul>
            {/*<ul className="flex items-center">
                <li className="active">
                    <label>All ({counts.all || 0})</label>
                </li>
                <li>
                    <label>Scheduled ({counts.scheduled || 0})</label>
                </li>
                <li>
                    <label>Sent ({counts.sent || 0})</label>
                </li>
            </ul>*/}
            <div className="flex flex-1 justify-end">
                <button className="flex rounded-sm" onClick={() => handleForm({}, true)}>
                    <OffersPlus />
                    <span>Add Notification</span>
                </button>
            </div>
        </section>
    )
}


export default PushHeader;