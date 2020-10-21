import React from 'react';
import OffersLocation from '../../../svg/offers-location';
import OffersViewEdit from '../../../svg/offers-view-edit';

const OfferEditTabService = () => {
    return(
        <>
            <section className="offers-edit__service">
                <form className="w-full">
                    <div className="form-group">
                        <label>Title</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Enter Title" />
                    </div>
                    <div className="form-group-textarea">
                        <label>About</label>
                        <textarea type="text" placeholder="Say something about this need" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <OffersLocation />
                        <input className="location appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Enter Location" />
                    </div>
                    <div className="offers-edit__featured">
                        <label>Featured Image</label>
                        <div className="flex bg-cover bg-center" style={{backgroundImage: "url(https://www.ratemds.com/blog/wp-content/uploads/2015/09/handshake-shaking-hands-shake-hands-trust.jpg)"}}>
                            <button>
                                <OffersViewEdit /> 
                                Update Image
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default OfferEditTabService