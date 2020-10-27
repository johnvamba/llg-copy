import React, { useState } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const UsersForm = ({ setState, state, label }) => {
    const [userTypeOpen, setUserTypeOpen] = useState(false);
    const [userTypeLabel, setUserTypeLabel] = useState('Select User Type');
    const [organisationOpen, setOrganisationOpen] = useState(false);
    const [organisationLabel, setOrganisationLabel] = useState('Select Organisation');

    return (
        <>
            <section className="users-form">
                <div className="users-form__body">
                    <header>
                        <h2>{label}</h2>
                        <button type="button" onClick={() => setState(false)}>
                            <OffersFormCross />
                        </button>
                    </header>
                    <div className="content">
                        <div>
                            <img
                                className="rounded-full image"
                                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                            />
                            <div>
                                <button>Upload Photo</button>
                                <p>Images should be atleast 300 x 300 px in pngo or jpeg file</p>
                            </div>
                        </div>
                        <form>
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                            type="text"
                                            placeholder="Enter First Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                            type="text"
                                            placeholder="Enter Email Address"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                            type="text"
                                            
                                            placeholder="Enter Last Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input
                                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                            type="text"
                                            placeholder="Enter Age"
                                        />
                                    </div>
                                </div>
                                <div className="w-full xl:w-full px-2">
                                    <div className="form-group">
                                        <label>Bio</label>
                                        <input
                                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                            type="text"
                                            placeholder="Enter something about yourself"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                    <div className={`form-group ${userTypeOpen ? 'active' : ''}`}>
                                        <label>User Type</label>
                                        <Dropdown isOpen={userTypeOpen} toggle={() => setUserTypeOpen(prevState => !prevState)}>
                                            <DropdownToggle>
                                                <span className={(userTypeLabel == "Select User Type") ? 'default' : 'selected'}>{userTypeLabel}</span>
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setUserTypeLabel('App User')}>App User</DropdownItem>
                                                <DropdownItem onClick={() => setUserTypeLabel('Organisational User')}>Organisational User</DropdownItem>
                                                <DropdownItem onClick={() => setUserTypeLabel('Campus User')}>Campus User</DropdownItem>
                                                <DropdownItem onClick={() => setUserTypeLabel('Super User')}>Super User</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                    <div className={`form-group ${organisationOpen ? 'active' : ''}`}>
                                        <label>Organisation</label>
                                        <Dropdown isOpen={organisationOpen} toggle={() => setOrganisationOpen(prevState => !prevState)}>
                                            <DropdownToggle>
                                                <span className={(organisationLabel == "Select Organisation") ? 'default' : 'selected'}>{organisationLabel}</span>
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setOrganisationLabel('App User')}>App User</DropdownItem>
                                                <DropdownItem onClick={() => setOrganisationLabel('Organisational User')}>Organisational User</DropdownItem>
                                                <DropdownItem onClick={() => setOrganisationLabel('Campus User')}>Campus User</DropdownItem>
                                                <DropdownItem onClick={() => setOrganisationLabel('Super User')}>Super User</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <footer className="offers-edit-opt">
                    <div className="offers-edit-opt__container flex">
                        <button className="discard" onClick={() => setState(false)}>Discard</button>
                        <div>
                            <button className="next">{label == 'Add User' ? 'Add' : 'Update' }</button>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    )
}
export default UsersForm;