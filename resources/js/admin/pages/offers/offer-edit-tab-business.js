import React from 'react';

const OfferEditTabBusiness = () => {
    return(
        <>
            <section className="offers-edit__business">
                <form class="w-full">
                    <div className="form-group">
                        <label>Name of Business</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Enter Business Name" />
                    </div>
                    <div className="form-group">
                        <label>Business Website (optional)</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="eg. sample@gmail.com" />
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="eg. (02) 9876 5432" />
                    </div>
                </form>
            </section>
        </>
    )
}

export default OfferEditTabBusiness