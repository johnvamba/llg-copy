import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import Logo from '../../assets/images/logo.png';
import containerImage from '../../assets/images/create-org.jpg';
import mainBackground from '../../assets/images/login-2.jpg';
import CategoryGrid from '../components/CategoryGrid'

import './org-pub.css';

import 'pretty-checkbox';

const OrgInfoTab = ({ orgData, handleOrgInfo, errors }) => {
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
                            onChange={handleOrgInfo}
                            placeholder="Enter Email Address"
                        />
                        {
                            (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">Missing email</span>
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
                        <input
                            className="input-field"
                            type="text"
                            value={orgData.phone_number}
                            name="phone_number"
                            onChange={handleOrgInfo}
                            placeholder="Enter Phone Number"
                        />
                        {
                            (errors.phone_number || false) && <span className="text-xs pt-1 text-red-500 italic">Missing phone number</span>
                        }
                    </div>
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

