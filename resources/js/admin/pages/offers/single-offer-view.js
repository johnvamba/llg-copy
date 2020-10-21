import React, {useState} from 'react';

import OfferView from './offer-view';
import OfferEdit from './offer-edit';

const SingleViewOffer = ({ showSingleOffer, setShowSingleOffer }) => {
    const [showOfferEdit, setShowOfferEdit] = useState(false);
    return(
        <>
            {
                showSingleOffer && 
                    <div className="view-offer">
                           { showOfferEdit ? (<OfferEdit setShowOfferView={setShowSingleOffer} setShowOfferEdit={setShowOfferEdit} />) : (<OfferView setShowOfferEdit={setShowOfferEdit} />) }
                    </div>
            }
        </>
    )
}

export default SingleViewOffer