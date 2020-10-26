import React, { useState } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import FormTabInfo from './form-tab-info';
import FormTabInvite from './form-tab-invite';
import FormTabGoal from './form-tab-goal';


const GroupsForm = ({ showAdd, setState }) => {
    const [showCategory, setShowCategory] = useState(true);
    const [showService, setShowService] = useState(false);
    const [showBusiness, setShowBusiness] = useState(false);

    const [countTab, setCountTab] = useState(1);
    const [activeTab, setActiveTab] = useState('category');

    const handleTab = (tab) => {
        switch(tab) {
            case 'category':
                setShowCategory(true);
                setShowService(false);
                setShowBusiness(false);
                return;
            case 'service':
                setShowService(true);
                setShowCategory(false);
                setShowBusiness(false);
                return;
            case 'business':
                setShowBusiness(true);
                setShowService(false);
                setShowCategory(false);
                return;    
            default:
                return;
        }
    }

    const nextTab = (active) => {
        switch(active) {
            case 'category':
                setShowCategory(false);
                setShowService(true);
                setShowBusiness(false);
                setActiveTab('service');
                setCountTab(2);
                return;
            case 'service':
                setShowCategory(false);
                setShowService(false);
                setShowBusiness(true);
                setActiveTab('business');
                setCountTab(3);
                return;
            default:
                return;
        }
    }

    const backTab = (active) => {
        switch(active) {
            case 'service':
                setShowCategory(true);
                setShowService(false);
                setShowBusiness(false);
                setActiveTab('category');
                setCountTab(1);
                return;
            case 'business':
                setShowCategory(false);
                setShowService(true);
                setShowBusiness(false);
                setActiveTab('service');
                setCountTab(2);
                return;
            default:
                return;
        }
    }

    return (
        <div className="offers-create-form">
            <button className="offers-create-form__close" type="button" onClick={()=>setState(false)}>
                <OffersFormCross />
            </button>
            <div className="offers-create-form__header">
                <h2>{showAdd ? 'Add Group' : 'Edit Group'}</h2>
                {
                    showAdd
                    ? (<>
                            <div className="relative pt-1">
                                <div className="w-full bg-gray-400 rounded-full">
                                    <div className={`bg-blue-400 rounded-full leading-none py-1 text-white tab-${activeTab}`}></div>
                                </div>
                            </div>
                            <p>{countTab} of 3</p>
                        </>
                    )
                    : (<div className="offer-edit__opts">
                            <ul>
                                <li className={"offer-edit__opts-item w-1/3 " + (showCategory ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab('category')}><h3>Group Information</h3></li>
                                <li className={"offer-edit__opts-item w-1/3 " + (showService ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab('service')}><h3>Invite People</h3></li>
                                <li className={"offer-edit__opts-item w-1/3 " + (showBusiness ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab('business')}><h3>Set your Group Goal</h3></li>
                            </ul>
                        </div>)
                }
            </div>
            
            <div className="offers-create-form__body">
                { showCategory && <FormTabInfo />}
                { showService && <FormTabInvite />}
                { showBusiness && <FormTabGoal />}
            </div>

             <section className="offers-category-opt">
                <div className="offers-category-opt__container flex">
                    <button className="discard" onClick={()=>setState(false)}>Discard</button>
                    <div>
                        <button className="back" onClick={() => backTab(activeTab)}>Back</button>
                        {
                            (activeTab !== "business") 
                            ? (<button className="next" onClick={() => nextTab(activeTab)}>Next</button>)
                            : (<button className="next">Create</button>)
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GroupsForm;