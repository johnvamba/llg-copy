import React from 'react';
import OffersEmployment from '../../../svg/offers-employment';
import OffersViewStatus from '../../../svg/offers-view-status';
import OffersViewEdit from '../../../svg/offers-view-edit';
import OffersViewWeb from '../../../svg/offers-view-web';
import OffersViewPhone from '../../../svg/offers-view-phone';


const OfferView = ({ setShowOfferEdit }) => {
    return(
        <>
            <div className="view-offer__header flex flex-wrap">
                <div className="view-offer__header-left flex flex-wrap">
                    <OffersViewStatus />
                    <label>On-Going</label>
                </div>
                <div className="view-offer__header-right flex flex-wrap" onClick={() => setShowOfferEdit(true)} >
                    <OffersViewEdit />
                    <label>Edit</label>
                </div>
            </div>
            <div className="view-offer__body">
                <div className="bg-cover bg-center h-100" style={{backgroundImage: "url(https://www.ratemds.com/blog/wp-content/uploads/2015/09/handshake-shaking-hands-shake-hands-trust.jpg)"}}></div>
                <div className="view-offer__body-title flex">
                    <h2>Sample Title Here</h2>
                    <label>08/27/20</label>
                </div>
                <div className="under-title flex flex-wrap">
                    <OffersEmployment />
                    <label>Employment</label>
                </div>
                <div className="view-offer__map">
                    <label>Location</label>
                    <div>

                    </div>
                </div>
                <label className="view-offer__about">About</label>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute</p>
                <div className="view-offer__bottom flex">
                    <div>
                        <label>Offer By</label>
                        <h3>Business Name Sample</h3>
                        <div className="flex">
                            <OffersViewWeb />
                            <label>www.business.com</label>
                        </div>
                        <div className="flex">
                            <OffersViewPhone />
                            <label>(02)9876 5432</label>
                        </div>
                    </div>
                    <div>
                        <button>View Website</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OfferView