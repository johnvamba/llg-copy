import React, { useState } from 'react';
import Camera from '../../../svg/camera';
import OffersFormCross from '../../../svg/offers-form-cross';
import PencilIcon from '../../../svg/pencil';
import OffersPlus from '../../../svg/offers-plus';

import TabMembers from './tab-members';
import TabActiveNeeds from './tab-active-needs';
import TabPastNeeds from './tab-past-needs';

const OrgInfo = ({ setShowViewOrg, handleEdit, handleInvite }) => {

    const [tab, setTab] = useState('active-needs');

    return (
        <>
            <section className="org-view create-form">
                <header>
                    <div className="org-form__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                        <button className="org-form__close" onClick={() => setShowViewOrg(false)}>
                            <OffersFormCross />
                        </button>
                        <div className="org-form__rounded-img"></div>
                    </div>
                    <div className="org-view__edit">
                        <button onClick={() => handleEdit(true)}>
                            <PencilIcon />
                            Edit
                        </button>
                    </div>
                    <div className='org-view__details'>
                        <h2>Organisation 01</h2>
                        <div className="org-view__info-with-icon">
                            <i className="fas fa-globe text-gray-400"></i>
                            <label>www.organisation.com</label>
                        </div>
                        <div className="org-view__info-with-icon--two">
                            <div className="org-view__info-with-icon">
                                <i className="fas fa-phone-alt text-gray-400"></i>
                                <label>(02) 9876 5432</label>
                            </div>
                            <div className="org-view__info-with-icon">
                                <i className="fas fa-envelope text-gray-400"></i>
                                <label>organisation@gmail.com</label>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute</p>
                    </div>
                </header>
                <section className="org-view__body">
                    <div className="org-view__members">
                        <label>Members (24)</label>
                        <div className="org-view__members--container">
                            <ul>
                                <li>
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                </li>
                                <li>
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                </li>
                                <li>
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                </li>
                                <li>
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                </li>
                                <li>
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                </li>
                                <li>
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                </li>
                                <li>
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                </li>
                                <li>
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                </li>
                                <li className="last-item">
                                    <img
                                    className="rounded-full"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                    />
                                    <i className="text-sm fas fa-ellipsis-h"></i>
                                </li>
                            </ul>
                            <button onClick={handleInvite}>
                                <OffersPlus />
                                Invite
                            </button>
                        </div>
                    </div>
                    <div className="org-view__tabs offer-edit__opts">
                        <ul>
                            <li className={"offer-edit__opts-item w-1/3 " + ((tab === 'members') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('members')}><h3>Organisation Members (24)</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + ((tab === 'active-needs') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('active-needs')}><h3>Active Needs (2)</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + ((tab === 'past-needs') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('past-needs')}><h3>Past Needs (1)</h3></li>
                        </ul>
                    </div>
                    <div className="offers-create-form__body">
                        { (tab === 'members') && <TabMembers />}
                        { (tab === 'active-needs') && <TabActiveNeeds />}
                        { (tab === 'past-needs') && <TabPastNeeds />}
                    </div>
                </section>
            </section>
        </>
    )
}
export default OrgInfo;