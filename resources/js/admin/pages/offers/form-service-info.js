import React from 'react';
import OffersLocation from '../../../svg/offers-location';
import Browse from '../../../svg/browse';

const FormServiceInfo = () => {
	return(
		<>
            <h3>Service Information</h3>
            <section className="offers-service">
                <form className="w-full">
                    <div className="form-group">
                        <label>Title</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Enter Title" />
                    </div>
                    <div className="form-group">
                        <label>About</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Say something about this need" />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <OffersLocation />
                        <input className="location appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Enter Location" />
                    </div>
                    <div className="offers-service__featured">
                        <label>Featured Image</label>
                        <div>
                            <div>
                                <Browse />
                                <span>Drag & drop or browse</span>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
		</>
	)
}


export default FormServiceInfo;