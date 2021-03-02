import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import OffersLocation from '../../../svg/offers-location';
import Browse from '../../../svg/browse';
import Location from '../../../components/Location'
import { selectStyle, selectStylePaddingZero, loadOrganization, loadCampus } from '../../../components/helpers/async_options';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import CircleImageForm from '../../../components/CircleImageForm';

const FormTabInfo = ({ handleInputChange, fieldErrors, fields, handleSelectPrivacy, handleLocation, AuthUserReducer, onChangePhoto, setCampus, campus, data }) => {
    const { roles } = AuthUserReducer;
    const [organization, setOrganization] = useState({});

    const [privacyOpen, setPrivacyOpen] = useState(false);

	return(
		<>
            <h3>Group Information</h3>
            <section className="tab__content">
                <CircleImageForm src={fields.photo} onChangeFile={onChangePhoto} error={fieldErrors.photo} editForm={ data.id ? true : false } />
                <form className="w-full">
                    <div className="w-full xl:w-full">
                        <div className={`form-group ${fieldErrors.name ? 'form-error' : ''}`}>
                            <label>Group Name</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Enter Group Name"
                                name="name"
                                onChange={handleInputChange}
                                value={fields.name}
                            />
                        </div>
                        {
                            (fieldErrors.name || false) && <span className="text-xs pt-1 text-red-500 italic">{fieldErrors.name}</span>
                        }
                    </div>
                    {
                        //Set user priveledges here.. campus users will need to know what organization is asking for need.
                        (roles.name == 'admin') && <div className={`form-group w-full ${fieldErrors.campus && 'form-error'}`}>
                            <label>Location</label>
                            <AsyncSelect
                                styles={selectStylePaddingZero}
                                loadOptions={loadCampus}
                                defaultOptions
                                cacheOptions
                                value={campus}
                                placeholder="Location"
                                onChange={setCampus}
                                />
                            {
                                (fieldErrors.campus || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organization</span>
                            }
                        </div>
                    }
                    {
                        //Set user priveledges here.. campus users will need to know what organization is asking for need.
                        // (roles.name == 'admin') && <div className={`form-group w-full ${fieldErrors.organization && 'form-error'}`}>
                        //     <label>Organization</label>
                        //     <AsyncSelect
                        //         styles={selectStyle}
                        //         loadOptions={loadOrganization}
                        //         defaultOptions
                        //         value={organization}
                        //         placeholder="Organization"
                        //         onChange={setOrganization}
                        //         />
                        //     {
                        //         (fieldErrors.organization || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organization</span>
                        //     }
                        // </div>
                    }
                    <div className="w-full xl:w-full">
                        <div className={`form-group ${fieldErrors.description ? 'form-error' : ''}`}>
                            <label>Group Description</label>
                            {/*
                            <textarea className="input-field" placeholder="Enter description" name="description" onChange={handleInputChange} value={fields.description}/>
                            */}
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                onChange={handleInputChange}
                                value={fields.description}
                            />
                        </div>
                        {
                            (fieldErrors.description || false) && <span className="text-xs pt-1 text-red-500 italic">{fieldErrors.description}</span>
                        }
                        {/*<span className="input-error-msg">{fieldErrors.description}</span>*/}
                    </div>
                    {/*<div className="w-full xl:w-full">
                        <div className={`form-group ${fieldErrors.address && 'form-error'}`}>
                            <label>Street Address</label>
                            <input type='text' className="input-field" name="address" placeholder="House # and/or Lot" value={fields.address} onChange={handleInputChange}/>
                            {
                                (fieldErrors.address || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Street Address</span>
                            }
                        </div>
                    </div>*/}
                    <div className="w-full xl:w-full">
                        <Location 
                            className={`${fieldErrors.location && 'form-error'}`}
                            name={'location'}
                            defaultValue={fields.location}
                            placesSelected={handleLocation}
                            errors={[fieldErrors.location] || []}
                        />
                    </div>
                    <div className="w-full sm:w-full md:w-full">
                        <div className={`form-group form-input-select ${privacyOpen ? 'active' : ''} ${(!privacyOpen && fieldErrors.privacy && !fields.privacy) ? 'has-error' : ''}`}>
                            <label>Privacy</label>
                            <Dropdown isOpen={privacyOpen} toggle={() => setPrivacyOpen(prevState => !prevState)}>
                                <DropdownToggle>
                                    <span className={(!fields.privacy) ? 'default' : 'selected'}>{(!fields.privacy) ? 'Select Organisation Privacy' : fields.privacy}</span>
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

export default connect(({AuthUserReducer})=>{
    return {
        AuthUserReducer
    }
},(dispatch)=>{
    return {

    }
})(FormTabInfo);

//export default FormTabInfo;
