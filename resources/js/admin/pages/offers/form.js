import React, { useState } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import FormSelectCategory from './form-select-category';
import FormServiceInfo from './form-service-info';
import FormBusinessInfo from './form-business-info';


const OffersCreateForm = ({setShowForm}) => {
    const [showCategory, setShowCategory] = useState(true);
    const [showService, setShowService] = useState(false);
    const [showBusiness, setShowBusiness] = useState(false);

    const [countTab, setCountTab] = useState(1);
    const [activeTab, setActiveTab] = useState('category');

    // const [showTabCategory, setShowTabCategory] = useState(true);
    // const [showTabService, setShowTabService] = useState(false);

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
            <button className="offers-create-form__close" type="button" onClick={()=>setShowForm(false)}>
                <OffersFormCross />
            </button>
            <div className="offers-create-form__header">
                <h2>Create Offer</h2>
                <div className="relative pt-1">
                  <div className="w-full bg-gray-400 rounded-full">
                    <div className={`bg-blue-400 rounded-full leading-none py-1 text-white tab-${activeTab}`}></div>
                  </div>
                </div>
                <p>{countTab} of 3</p>
            </div>
            
            <div className="offers-create-form__body">
                { showCategory && <FormSelectCategory />}
                { showService && <FormServiceInfo />}
                { showBusiness && <FormBusinessInfo />}
            </div>

             <section className="offers-category-opt">
                <div className="offers-category-opt__container flex">
                    <button className="discard" onClick={()=>setShowForm(false)}>Discard</button>
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

export default OffersCreateForm;