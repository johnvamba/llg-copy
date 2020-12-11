import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import PlusRounded from '../svg/plus-rounded'

import './org-pub.css';

import 'pretty-checkbox';

const OrgInviteTab = ({ orgData, handleOrgInvite, errors }) => {

    return (
        <>
            <form>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full sm:w-full md:w-full xl:w-1/3 px-2">
                        <div className={`form-group ${errors.email && 'form-error'}`}>
                            <label>Email Address</label>
                            <input
                                className="input-field"
                                type="text"
                                value={orgData.email}
                                name="email"
                                onChange={handleOrgInvite}
                                placeholder="Enter Email Address"
                            />
                            {
                                (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">Missing email</span>
                            }
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/3 px-2">
                        <div className={`form-group ${errors.name && 'form-error'}`}>
                            <label>First Name (Optional)</label>
                            <input
                                className="input-field"
                                type="text"
                                value={orgData.firstName}
                                name="firstName"
                                onChange={handleOrgInvite}
                                placeholder="Enter First Name"
                            />
                            {
                                (errors.name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing name</span>
                            }
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/3 px-2">
                        <div className={`form-group ${errors.name && 'form-error'}`}>
                            <label>Last Name (Optional)</label>
                            <input
                                className="input-field"
                                type="text"
                                value={orgData.lastName}
                                name="lastName"
                                onChange={handleOrgInvite}
                                placeholder="Enter Last Name"
                            />
                            {
                                (errors.name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing name</span>
                            }
                        </div>
                    </div>
                </div>
            </form>
            <div className="invite-tab-actions flex items-center">
                <PlusRounded />
                <div>
                    <span className="action-text">Add New</span>
                    <span className="action-or">or</span>
                    <span className="action-text">Add Multiple at Once</span>
                </div>
            </div>
        </>
    )

}


export default OrgInviteTab;

