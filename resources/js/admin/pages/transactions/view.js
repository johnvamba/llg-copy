import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OffersFormCross from '../../../svg/offers-form-cross';
import { EmailValidator } from '../../../utils/helper';
import { selectStylePaddingZero, loadOrganization } from '../../../components/helpers/async_options';
import AsyncSelect from 'react-select/async';
import LoadingScreen from '../../../components/LoadingScreen'

const TransactionsView = ({ data = {}, handleForm }) => {
    const [submitting, setSubmitting] = useState(false);

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
                <h3>View Transaction</h3>
                <button type="button" onClick={() => handleForm()}>
                    <OffersFormCross />
                </button>
            </header>
            <section className="form-body transaction-form__body">
                <form className="flex flex-wrap justify-between -mx-2">
                    <div className="w-full sm:w-full md:w-full px-2">
                        <div className={`form-group`}>
                            <label>Organization</label>
                            <p>{data.org_name || 'Missing organization'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full px-2">
                        <div className={`form-group`}>
                            <label>Need</label>
                            <p>{ data.need_title || 'Missing need'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Giver Name</label>
                            <p>{ data.giversName || 'Missing giver'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Email</label>
                            <p>{ data.email || 'Missing email'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Amount</label>
                            <p><span className="currency">$</span>{ data.amount || 'Missing amount'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Phone Number</label>
                            <p>{ data.phone_number || 'Missing phone'}</p>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default TransactionsView