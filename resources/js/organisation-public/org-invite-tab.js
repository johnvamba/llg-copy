import React, { useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import PlusRounded from '../svg/plus-rounded'
import { validateEmail, isValidated } from '../components/helpers/validator';
import {  checkEmail } from '../components/helpers/async_options';
import {IMaskInput} from 'react-imask';

import './org-pub.css';

import 'pretty-checkbox';

const User = ({form}) => {
    return <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-full md:w-full xl:w-1/4 px-2">
            <div className={`form-group `}>
                <label>Email Address</label>
                <input
                    className="input-field"
                    type="text"
                    defaultValue={form.email}
                    name="email"
                    disabled
                    placeholder="Enter Email Address"
                />
            </div>
        </div>
        <div className="w-full sm:w-full md:w-full xl:w-1/4 px-2">
            <div className={`form-group`}>
                <label>First Name</label>
                <input
                    className="input-field"
                    type="text"
                    defaultValue={form.firstName}
                    name="firstName"
                    disabled
                    placeholder="Enter First Name"
                />
            </div>
        </div>
        <div className="w-full sm:w-full md:w-full xl:w-1/4 px-2">
            <div className={`form-group`}>
                <label>Last Name</label>
                <input
                    className="input-field"
                    type="text"
                    value={form.lastName}
                    name="lastName"
                    disabled
                    placeholder="Enter Last Name"
                />
            </div>
        </div>
        <div className="w-full sm:w-full md:w-full xl:w-1/4 px-2">
            <div className={`form-group`}>
                <label>Phone Number</label>
                <input
                    className="input-field"
                    type="text"
                    value={form.phone}
                    name="phone"
                    disabled
                    placeholder="Enter Phone Number"
                />
            </div>
        </div>
    </div>
}

const OrgInviteTab = ({ submitting, users, setUsers, form,errors, handleOrgInvite, handleOrgInvitePhone, handleEmail, addUser }) => {
    const [inputRef, setNumbRef] = useState(null);
    return (
        <>
            <form>
                {
                    users.length > 0 && users.map(i => <User key={i.email} form={i}/>)
                }
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full sm:w-full md:w-full xl:w-1/4 px-2">
                        <div className={`form-group ${errors.email && 'form-error'}`}>
                            <label>Email Address</label>
                            <input
                                className="input-field"
                                type="text"
                                value={form.email}
                                name="email"
                                onChange={handleEmail}
                                placeholder="Enter Email Address"
                            />
                            {
                                (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">{errors.email || 'Missing email'}</span>
                            }
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/4 px-2">
                        <div className={`form-group ${errors.name && 'form-error'}`}>
                            <label>First Name (Optional)</label>
                            <input
                                className="input-field"
                                type="text"
                                value={form.firstName}
                                name="firstName"
                                onChange={handleOrgInvite}
                                placeholder="Enter First Name"
                            />
                            {
                                (errors.name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing name</span>
                            }
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/4 px-2">
                        <div className={`form-group ${errors.name && 'form-error'}`}>
                            <label>Last Name (Optional)</label>
                            <input
                                className="input-field"
                                type="text"
                                value={form.lastName}
                                name="lastName"
                                onChange={handleOrgInvite}
                                placeholder="Enter Last Name"
                            />
                            {
                                (errors.name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing name</span>
                            }
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/4 px-2">
                        <div className={`form-group ${errors.phone && 'form-error'}`}>
                            <label>Phone</label>
                            <IMaskInput
                            className="input-field"
                              mask={'00 0000 0000 [00]'}
                              value={form.phone || ''}
                              unmask={false} 
                              inputRef={setNumbRef}
                              onComplete={handleOrgInvitePhone}
                              placeholder='Enter number here'
                            />
                            {/*<input
                                className="input-field"
                                type="text"
                                value={form.phone}
                                name="phone"
                                onChange={handleOrgInvite}
                                placeholder="Enter Phone Contact"
                            />*/}
                            {
                                (errors.phone || false) && <span className="text-xs pt-1 text-red-500 italic">Missing phone</span>
                            }
                        </div>
                    </div>
                </div>
            </form>
            <div className="invite-tab-actions flex items-center" onClick={addUser}>
                <PlusRounded />
                <div >
                    <span className="action-text">Additional Contacts</span>
                    <span className="action-or">or</span>
                    <span className="action-text">Add Multiple at Once</span>
                </div>
            </div>
            {
                (errors.users) && <span className="text-xs pt-1 mt-3 text-red-500 italic">Missing a primary contact</span>
            }
        </>
    )

}


export default OrgInviteTab;

