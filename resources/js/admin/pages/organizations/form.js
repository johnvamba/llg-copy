import React from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Camera from '../../../svg/camera';
import StoriesHouseIcon from '../../../svg/stories-house';
import PencilIcon from '../../../svg/pencil';

const OrgForm = ({ handleClose, page }) => {
    return (
        <>
            <section className="org-form">
                <div className="create-story__header">
                    <h2>{page} Organisation</h2>
                    <button type="button" onClick={handleClose}>
                        <OffersFormCross />
                    </button>
                </div>
                <header>
                    <div className="org-form__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                        <button>
                            <Camera /> 
                            Add Cover
                        </button>
                        <div className="org-form__rounded-img"></div>
                        <div className="org-form__edit">
                            <PencilIcon />
                        </div>
                    </div>
                </header>
                <section className="org-form__body">
                    <form>
                        <div className="form-group">
                            <label>Select Category</label>
                            <ul>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li className={page == 'Edit' ? 'active' : null}>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                                <li>
                                    <div>
                                        <StoriesHouseIcon />
                                    </div>
                                    <label>Housing</label>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className="form-group form-input-text">
                                    <label>Organisation Name</label>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Enter Organisation Name"
                                    />
                                </div>
                                <div className="form-group form-input-text">
                                    <label>Email</label>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Enter Email Address"
                                    />
                                </div>
                            </div>
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className="form-group form-input-text">
                                    <label>Website</label>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="eg. www.website.com"
                                    />
                                </div>
                                <div className="form-group form-input-text">
                                    <label>Phone Number</label>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Enter Phone Number"
                                    />
                                </div>
                            </div>
                            <div className="w-full xl:w-full px-2">
                                <div className="form-group form-group-textarea">
                                    <label>About</label>
                                    <textarea type="text" placeholder="Say something about this need" rows="3"></textarea>
                                </div>
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
export default OrgForm;