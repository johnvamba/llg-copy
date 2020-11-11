import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OffersFormCross from '../../../svg/offers-form-cross';

const PaymentForm = ({ closeForm }) => {

    const [needOpen, setNeedOpen] = useState(false);
    const [needLabel, setNeedLabel] = useState('Select Need');

    return(
        <>
            <section className="payment-form create-form">
                <header className="create-story__header">
                    <h2>Add Payment</h2>
                    <button type="button" onClick={() => closeForm(false)}>
                        <OffersFormCross />
                    </button>
                </header>
                <section className="payment-form__body">
                    <form className="flex flex-wrap justify-between -mx-2">
                        <div className="w-full sm:w-full md:w-full px-2">
                            <div className={`form-group form-input-select ${needOpen ? 'active' : ''}`}>
                                <label>Need</label>
                                <Dropdown isOpen={needOpen} toggle={() => setNeedOpen(prevState => !prevState)}>
                                    <DropdownToggle>
                                        <span className={(needLabel === "Select Need") ? 'default' : 'selected'}>{needLabel}</span>
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setNeedLabel('Need 1')}>Need 1</DropdownItem>
                                        <DropdownItem onClick={() => setNeedLabel('Need 2')}>Need 2</DropdownItem>
                                        <DropdownItem onClick={() => setNeedLabel('Need 3')}>Need 3</DropdownItem>
                                        <DropdownItem onClick={() => setNeedLabel('Need 4')}>Need 4</DropdownItem>
                                        <DropdownItem onClick={() => setNeedLabel('Need 5')}>Need 5</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="w-full xl:w-full px-2">
                            <div className="form-group form-input-text">
                                <label>First Name</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter First Name"
                                />
                            </div>
                        </div>
                        <div className="w-full xl:w-full px-2">
                            <div className="form-group form-input-text">
                                <label>Surname</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Surname"
                                />
                            </div>
                        </div>
                        <div className="w-full xl:w-full px-2">
                            <div className="form-group form-input-text">
                                <label>Email Address</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Email Address"
                                />
                            </div>
                        </div>
                        <div className="w-full xl:w-full px-2">
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
                    </form>
                </section>
                <footer className="org-form__footer">
                    <div className="flex">
                        <button className="discard" onClick={() => closeForm(false)}>Discard</button>
                        <button className="next">Create</button>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default PaymentForm;