import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import OffersLocation from '../../../svg/offers-location';
import Browse from '../../../svg/browse';


const FormTabInfo = ({ handleInputChange, fieldErrors, fields, handleSelectPrivacy }) => {

    const [privacyOpen, setPrivacyOpen] = useState(false);

	return(
		<>
            <h3>Group Information</h3>
            <section className="tab__content">
                <header>
                    <div className="image"></div>
                    <div>
                        <button>Upload Photo</button>
                        <p>Images should be atleast 300 x 300 px in pngo or jpeg file</p>
                    </div>
                </header>
                <form className="w-full">
                    <div className="w-full xl:w-full">
                        <div className={`form-group form-input-text ${fieldErrors.name ? 'has-error' : ''}`}>
                            <label>Group Name</label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter Group Name"
                                name="name"
                                onChange={handleInputChange}
                                value={fields.name}
                            />
                        </div>
                        <span className="input-error-msg">{fieldErrors.name}</span>
                    </div>
                    <div className="w-full xl:w-full">
                        <div className={`form-group form-input-text ${fieldErrors.description ? 'has-error' : ''}`}>
                            <label>Group Description</label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                onChange={handleInputChange}
                                value={fields.description}
                            />
                        </div>
                        <span className="input-error-msg">{fieldErrors.description}</span>
                    </div>
                    <div className="w-full xl:w-full">
                        <div className={`form-group form-input-text form-input-text--location ${fieldErrors.location ? 'has-error' : ''}`}>
                            <label>Location</label>
                            <div>
                                <OffersLocation />
                                <input
                                    className="location appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Location"
                                    name="location"
                                    onChange={handleInputChange}
                                    value={fields.location}
                                />
                            </div>
                        </div>
                        <span className="input-error-msg">{fieldErrors.location}</span>
                    </div>
                    
                    <div className="w-full sm:w-full md:w-full">
                        <div className={`form-group form-input-select ${privacyOpen ? 'active' : ''} ${(!privacyOpen && fieldErrors.privacy && !fields.privacy) ? 'has-error' : ''}`}>
                            <label>Privacy</label>
                            <Dropdown isOpen={privacyOpen} toggle={() => setPrivacyOpen(prevState => !prevState)}>
                                <DropdownToggle>
                                    <span className={(!fields.privacy) ? 'default' : 'selected'}>{(!fields.privacy) ? 'Select Organisation' : fields.privacy}</span>
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => handleSelectPrivacy('Private')}>Private</DropdownItem>
                                    <DropdownItem onClick={() => handleSelectPrivacy('Public')}>Public</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        {
                            (!privacyOpen && fieldErrors.privacy && !fields.privacy) && <span className="input-error-msg">{fieldErrors.privacy}</span>
                        }
                    </div>
                </form>
            </section>
		</>
	)
}


export default FormTabInfo;