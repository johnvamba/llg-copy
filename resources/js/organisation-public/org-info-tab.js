import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import Logo from '../../assets/images/logo.png';
import containerImage from '../../assets/images/create-org.jpg';
import mainBackground from '../../assets/images/login-2.jpg';
import CategoryGrid from '../components/CategoryGrid'
import Location from '../components/Location'
import { validateEmail, isValidated } from '../components/helpers/validator';
import {  checkEmail } from '../components/helpers/async_options';
import {IMaskInput} from 'react-imask';

import './org-pub.css';

import 'pretty-checkbox';

const OrgInfoTab = ({ orgData, handleOrgInfo, handlePhone, setOrgInfoForm, setErrors, removeError, errors }) => {
    const [numbRef, setNumbRef] = useState(null);

    const handleEmail = (e, blur = false) => {
        const email = e.target.value
        handleOrgInfo(e)
        if(validateEmail(email) || blur){
            removeError('email')
            checkEmail(email, {type: 'organization'})
            .then(({data})=>{
                if(orgData.email == data.email){
                    if(data.status == 'free')
                        removeError('email')
                    else
                        setErrors({...errors, email: 'Email already existed'})                    
                }
            }).catch(e=> setErrors({...errors, email: 'Invalid Email'}))
        } else if (blur) {
            setErrors({...form, email: 'Not proper email'})
        }
    }

    const handleLocation = ({formatted_address, geometry}) => {
        setOrgInfoForm({
            ...orgData,
            location: formatted_address, 
            lat: geometry.location.lat(), 
            lng: geometry.location.lng()
        })
        removeError('location')
    }

    return (
        <form>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                    <div className={`form-group ${errors.name && 'form-error'}`}>
                        <label>Organisation Name</label>
                        <input
                            className="input-field"
                            type="text"
                            value={orgData.name}
                            name="name"
                            onChange={handleOrgInfo}
                            placeholder="Enter Organisation Name"
                        />
                        {
                            (errors.name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing name</span>
                        }
                    </div>
                    <div className={`form-group ${errors.email && 'form-error'}`}>
                        <label>Email</label>
                        <input
                            className="input-field"
                            type="text"
                            value={orgData.email}
                            name="email"
                            onChange={handleEmail}
                            onBlur={e=>handleEmail(e, true)}
                            placeholder="Enter Email Address"
                        />
                        {
                            (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">{errors.email}</span>
                        }
                    </div>
                </div>
                <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                    <div className={`form-group ${errors.site && 'form-error'}`}>
                        <label>Website</label>
                        <input
                            className="input-field"
                            type="text"
                            value={orgData.site}
                            name="site"
                            onChange={handleOrgInfo}
                            placeholder="eg. www.website.com"
                        />
                        {
                            (errors.site || false) && <span className="text-xs pt-1 text-red-500 italic">Missing site</span>
                        }
                    </div>
                    <div className={`form-group ${errors.phone_number && 'form-error'}`}>
                        <label>Phone Number</label>
                        <IMaskInput
                            className="input-field"
                          mask={'(00) 000000 000'}
                          value={orgData.phone_number || ''}
                          unmask={false} 
                          inputRef={setNumbRef}
                          onComplete={handlePhone}
                          placeholder='Enter number here'
                        />
                       {/* <input
                            className="input-field"
                            type="text"
                            value={orgData.phone_number}
                            name="phone_number"
                            onChange={handleOrgInfo}
                            placeholder="Enter Phone Number"
                        />*/}
                        {
                            (errors.phone_number || false) && <span className="text-xs pt-1 text-red-500 italic">Missing phone number</span>
                        }
                    </div>
                </div>
                {/*<div className="w-full xl:w-full px-2">
                    <div className={`form-group ${errors.benevity_link && 'form-error'}`}>
                        <label>Benevity Link</label>
                        <input
                            className="input-field"
                            type="text"
                            value={orgData.benevity_link}
                            name="benevity_link"
                            onChange={handleOrgInfo}
                            placeholder="Enter Benevity Link"
                        />
                        {
                            (errors.benevity_link || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Benevity Link</span>
                        }
                    </div>
                </div>*/}
                <div className="w-full xl:w-full px-2">
                    <Location 
                        className={`short-width ${errors.location && 'form-error'}`}
                        name={'location'}
                        defaultValue={orgData.location}
                        placesSelected={handleLocation}
                        errors={errors.location || []}
                    />
                </div>
                <div className="w-full xl:w-full px-2">
                    <div className={`form-group form-group-textarea ${errors.description && 'form-error'}`}>
                        <label>About</label>
                        <textarea type="text" placeholder="Say something about this organisation" rows="3"
                            value={orgData.description}
                            name="description"
                            onChange={handleOrgInfo}
                        ></textarea>
                        {
                            (errors.description || false) && <span className="text-xs pt-1 text-red-500 italic">Missing about description</span>
                        }
                    </div>
                </div>
            </div>
        </form>
    )

}


export default OrgInfoTab;

