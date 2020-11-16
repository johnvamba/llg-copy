import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OffersFormCross from '../../../svg/offers-form-cross';
import { EmailValidator } from '../../../utils/helper';

const TransactionsForm = ({ closeForm, activeForm }) => {

    const [orgOpen, setOrgOpen] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [fields, setFields] = useState({
        organisation: '',
        firstName: '',
        surname: '',
        email: '',
        phoneNumber: 0,
        amount: 0
    });
    const fieldErrorMsg = {
        organisation: 'Need to Select an Organisation',
        firstName: 'Missing First Name',
        surname: 'Missing Surname',
        email: 'Missing Email',
        phoneNumber: 'Missing Phone Number',
        amount: 'Missing Amount'
    }

    const handleInputChange = (e) => {
        setFieldErrors({...fieldErrors, [e.target.name] : '' });
        setFields({...fields, [e.target.name] : e.target.value });
    }

    const validateForm = () => {
        let errors = {};
        Object.keys(fields).map((keyname, i) => {
            if(!fields[keyname]) errors[keyname] = fieldErrorMsg[keyname];
        });

        // email validation if legit
        if (fields.email){
            let $result = EmailValidator(fields.email);
            if($result) errors['email'] = $result;
        }

        setFieldErrors(errors);
        if(Object.keys(errors).length === 0) return true;
        return false;
    }

    const handleSubmit = () => {
        if(validateForm()) console.log('success');
    }

    const handleSelectOrg = (option) => {
        setFields({...fields, organisation : option});
    }


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
                            <div className={`form-group form-input-select ${orgOpen ? 'active' : ''} ${(fieldErrors.organisation && !orgOpen && !fields.organisation) ? 'has-error' : ''} `}>
                                <label>Organisation</label>
                                <Dropdown isOpen={orgOpen} toggle={() => setOrgOpen(prevState => !prevState)}>
                                    <DropdownToggle>
                                        <span className={(!fields.organisation) ? 'default' : 'selected'}>{(!fields.organisation) ? 'Select Organisation' : fields.organisation}</span>
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => handleSelectOrg('Organisation 1')}>Organisation 1</DropdownItem>
                                        <DropdownItem onClick={() => handleSelectOrg('Organisation 2')}>Organisation 2</DropdownItem>
                                        <DropdownItem onClick={() => handleSelectOrg('Organisation 3')}>Organisation 3</DropdownItem>
                                        <DropdownItem onClick={() => handleSelectOrg('Organisation 4')}>Organisation 4</DropdownItem>
                                        <DropdownItem onClick={() => handleSelectOrg('Organisation 5')}>Organisation 5</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            {
                                (!orgOpen && !fields.organisation) && <span className="input-error-msg">{fieldErrors.organisation}</span>
                            }
                            
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group form-input-text ${fieldErrors.firstName ? 'has-error' : ''}`}>
                                <label>First Name</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    value={fields.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="input-error-msg">{fieldErrors.firstName}</span>
                            <div className={`form-group form-input-text ${fieldErrors.email ? 'has-error' : ''}`}>
                                <label>Email</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="email"
                                    name="email"
                                    placeholder="eg. sample@email.com"
                                    value={fields.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="input-error-msg">{fieldErrors.email}</span>
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group form-input-text ${fieldErrors.surname ? 'has-error' : ''}`}>
                                <label>Surname</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    name="surname"
                                    placeholder="Enter Surname"
                                    value={fields.surname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="input-error-msg">{fieldErrors.surname}</span>
                            <div className={`form-group form-input-text ${fieldErrors.phoneNumber ? 'has-error' : ''}`}>
                                <label>Phone Number</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="number"
                                    name="phoneNumber"
                                    placeholder="eg. (02) 9876 5432"
                                    value={fields.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="input-error-msg">{fieldErrors.phoneNumber}</span>
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group form-input-text ${fieldErrors.amount ? 'has-error' : ''}`}>
                                <label>Amount</label>
                                <div className="transactions-form__amount flex items-center">
                                    <span>$</span>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="number"
                                        name="amount"
                                        placeholder="0.00"
                                        value={fields.amount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <span className="input-error-msg">{fieldErrors.amount}</span>
                        </div>
                    </form>
                </section>
                <footer className="org-form__footer">
                    <div className="flex">
                        <button className="discard" onClick={() => closeForm(false)}>Discard</button>
                        <button className="next" onClick={handleSubmit}>Create</button>
                    </div>
                </footer>
            </section>
            
        </>
    )
}

export default TransactionsForm