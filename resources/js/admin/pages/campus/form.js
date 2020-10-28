import React from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Camera from '../../../svg/camera';

const CampusForm = ({ handleClose, activeForm }) => {
    return(
        <>
            <section className="campus-form create-form">
                <header className="create-story__header">
                    <h2>{activeForm} Campus</h2>
                    <button type="button" onClick={handleClose}>
                        <OffersFormCross />
                    </button>
                </header>
                <section className="campus-form__body">
                    <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}}>
                        <button>
                            <Camera /> 
                            Add Cover
                        </button>
                    </div>
                    <form>
                        <div className="w-full">
                            <div className="form-group form-input-text">
                                <label>Campus Name</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Campus Name"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="form-group form-input-text">
                                <label>Location</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Location"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="form-group form-group-textarea">
                                <label>Description</label>
                                <textarea type="text" placeholder="Write something about this campus" rows="3"></textarea>
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="org-form__footer">
                    <div className="flex">
                        <button className="discard" onClick={handleClose}>Discard</button>
                        <button className="next">Add</button>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default CampusForm;