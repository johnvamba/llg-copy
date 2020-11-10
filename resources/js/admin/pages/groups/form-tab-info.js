import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import OffersLocation from '../../../svg/offers-location';
import Browse from '../../../svg/browse';


const FormTabInfo = () => {

    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [privacyLabel, setPrivacyLabel] = useState('Select Privacy');

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
                        <div className="form-group form-input-text">
                            <label>Group Name</label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter Group Name"
                            />
                        </div>
                    </div>
                    <div className="w-full xl:w-full">
                        <div className="form-group form-input-text">
                            <label>Group Description</label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter description"
                            />
                        </div>
                    </div>
                    <div className="form-group form-input-text form-input-text--location">
                        <label>Location</label>
                        <div>
                            <OffersLocation />
                            <input className="location appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Enter Location" />
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full">
                        <div className={`form-group form-input-select ${privacyOpen ? 'active' : ''}`}>
                            <label>Privacy</label>
                            <Dropdown isOpen={privacyOpen} toggle={() => setPrivacyOpen(prevState => !prevState)}>
                                <DropdownToggle>
                                    <span className={(privacyLabel == "Select Privacy") ? 'default' : 'selected'}>{privacyLabel}</span>
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setPrivacyLabel('Private')}>Private</DropdownItem>
                                    <DropdownItem onClick={() => setPrivacyLabel('Public')}>Public</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </form>
            </section>
		</>
	)
}


export default FormTabInfo;