import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OffersFormCross from '../../../svg/offers-form-cross';

const TransactionsForm = ({ closeForm, activeForm }) => {

    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [privacyLabel, setPrivacyLabel] = useState('Select Organisation');


    return(
        <>
            <section className="transactions-form create-form">
                <header className="create-story__header">
                    <h2>{activeForm} Transaction</h2>
                    <button type="button" onClick={() => closeForm(false)}>
                        <OffersFormCross />
                    </button>
                </header>
                <section className="transaction-form__body">
                    <form className="flex flex-wrap justify-between -mx-2">
                        <div className="w-full sm:w-full md:w-full px-2">
                            <div className={`form-group form-select ${privacyOpen ? 'active' : ''}`}>
                                <label>Organisation</label>
                                <Dropdown isOpen={privacyOpen} toggle={() => setPrivacyOpen(prevState => !prevState)}>
                                    <DropdownToggle>
                                        <span className={(privacyLabel == "Select Organisation") ? 'default' : 'selected'}>{privacyLabel}</span>
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setPrivacyLabel('Organisation 1')}>Organisation 1</DropdownItem>
                                        <DropdownItem onClick={() => setPrivacyLabel('Organisation 2')}>Organisation 2</DropdownItem>
                                        <DropdownItem onClick={() => setPrivacyLabel('Organisation 3')}>Organisation 3</DropdownItem>
                                        <DropdownItem onClick={() => setPrivacyLabel('Organisation 4')}>Organisation 4</DropdownItem>
                                        <DropdownItem onClick={() => setPrivacyLabel('Organisation 5')}>Organisation 5</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className="form-group form-input-text">
                                <label>First Name</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter First Name"
                                />
                            </div>
                            <div className="form-group form-input-text">
                                <label>Email</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="eg. sample@email.com"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className="form-group form-input-text">
                                <label>Surname</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Surname"
                                />
                            </div>
                            <div className="form-group form-input-text">
                                <label>Phone Number</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="number"
                                    placeholder="eg. (02) 9876 5432"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className="form-group form-input-text">
                                <label>Amount</label>
                                <div className="transactions-form__amount flex items-center">
                                    <span>$</span>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="number"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                        <footer className="org-form__footer">
                            <div className="flex">
                                <button className="discard" onClick={() => closeForm(false)}>Discard</button>
                                <button className="next">Create</button>
                            </div>
                        </footer>
                    </form>
                </section>
            </section>
            
        </>
    )
}

export default TransactionsForm