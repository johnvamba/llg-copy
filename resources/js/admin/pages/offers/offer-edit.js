import React, { useState } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import OfferEditTabCategory from './offer-edit-tab-category';
import OfferEditTabService from './offer-edit-tab-service';
import OfferEditTabBusiness from './offer-edit-tab-business';


const OfferEdit = ({ setShowOfferView, setShowOfferEdit }) => {
    const [showTabCategory, setShowTabCategory] = useState(true);
    const [showTabService, setShowTabService] = useState(false);
    const [showTabBusiness, setShowTabBusiness] = useState(false);

    const handleTab = (tab) => {
        console.log(tab);
        switch(tab) {
            case 'category':
                setShowTabCategory(true);
                setShowTabService(false);
                setShowTabBusiness(false);
                return;
            case 'service':
                setShowTabService(true);
                setShowTabCategory(false);
                setShowTabBusiness(false);
                return;
            case 'business':
                setShowTabBusiness(true);
                setShowTabService(false);
                setShowTabCategory(false);
                return;    
            default:
                return;
        }
    }

    const handleClose = () => {
        setShowOfferView(false);
        setShowOfferEdit(true);
    }
    
    return(
        <>
            <div className="offer-edit">
                <div className="offer-edit__header">
                    <div className="offer-edit__top flex flex-wrap">
                        <h2>Edit Offer</h2>
                        <button type="button" onClick={handleClose}>
                            <OffersFormCross />
                        </button>
                    </div>
                </div>
                <div className="offer-edit__opts">
                        <ul>
                            <li className={"offer-edit__opts-item w-1/3 " + (showTabCategory ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab('category')}><h3>Select Category</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + (showTabService ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab('service')}><h3>Service Information</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + (showTabBusiness ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab('business')}><h3>Business Information</h3></li>
                        </ul>
                    </div>
                <div className="offers-edit__body">
                    
                    { showTabCategory && <OfferEditTabCategory />}
                    { showTabService && <OfferEditTabService />}
                    { showTabBusiness && <OfferEditTabBusiness />}

                    <section className="offers-edit-opt">
                        <div className="offers-edit-opt__container flex">
                            <button className="discard" onClick={handleClose}>Discard</button>
                            <div>
                                <button className="next">Create</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default OfferEdit