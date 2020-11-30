import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OffersFormCross from '../../../svg/offers-form-cross';
import { EmailValidator } from '../../../utils/helper';
import { selectStylePaddingZero, loadOrganization } from '../../../components/helpers/async_options';
import AsyncSelect from 'react-select/async';
import LoadingScreen from '../../../components/LoadingScreen'

const TransactionsForm = ({ data = {}, handleForm, afterSubmit }) => {
    const [orgOpen, setOrgOpen] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [organization, setOrganization] = useState({});
    const [fields, setFields] = useState({
        firstName: '',
        surname: '',
        email: '',
        phoneNumber: 0,
        amount: 0
    });
    useEffect(()=>{
        if(data.org_id && data.org_name){
            setOrganization({
                id: data.org_id,
                value: data.org_id,
                label: data.org_name
            })
        }
    }, [data])

    const [submitting, setSubmitting] = useState(false);

    const removeError= (name = '') => {
        delete fieldErrors[name]
        setFieldErrors(fieldErrors)
    }

    const fieldErrorMsg = {
        organization: 'Need to Select an Organisation',
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

        if(_.isEmpty(organization)){
            errors['organization'] = fieldErrorMsg['organization'];
        }
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
        if(validateForm() && !submitting) {
            setSubmitting(true)
            const params = {
                ...fields,
                organization
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/transacts`, {...params}) : 
                api.patch(`/api/web/transacts/${data.id}`, {...params})

            submitPromise.then(({data})=>{
                setSubmitting(false)
                handleForm(data.data);
                afterSubmit()
            }).catch(err=>{
                // console.log('error', err, err.response)
                if(err.response){
                    const { data } = err.response
                    setErrors(data.errors || [])
                }
                setSubmitting(false)
            })
        }
    }

    const handleSelectOrg = (option) => {
        setFields({...fields, organisation : option});
    }

    const handleOrganization = (organization) => {
        setOrganization(organization)
        if(organization)
            removeError('organization')
    }

    return(
        <section className="form transactions-form create-form">
            {
                (submitting) &&
                <LoadingScreen title={
                    (submitting && (data.id ? 'Updating Transaction' : 'Creating Transaction')) ||
                    'Please wait'
                }/>
            }
            <header className="form-title create-story__header">
                <h3>{data.id ? 'Edit' : 'Add'} Transaction</h3>
                <button type="button" onClick={() => handleForm()}>
                    <OffersFormCross />
                </button>
            </header>
            <section className="form-body transaction-form__body">
                <form className="flex flex-wrap justify-between -mx-2">
                    <div className="w-full sm:w-full md:w-full px-2">
                        <div className={`form-group ${fieldErrors.organization && 'form-error'}`}>
                            <label>Organization</label>
                               <AsyncSelect
                                    styles={selectStylePaddingZero}
                                    loadOptions={loadOrganization}
                                    defaultOptions
                                    value={organization}
                                    placeholder="Organization"
                                    onChange={handleOrganization}
                                    />
                                {
                                    (fieldErrors.organization || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organization</span>
                                }
                        </div>
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
            <footer className="form-footer org-form__footer">
                <button className="btn btn-secondary" onClick={() => handleForm()}>Discard</button>
                <button className="btn btn-primary" onClick={handleSubmit}>{data.id? 'Edit' : 'Create'}</button>
            </footer>
        </section>
    )
}

export default TransactionsForm