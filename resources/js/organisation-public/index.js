import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { Checkbox } from 'pretty-checkbox-react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import Logo from '../../assets/images/logo.png';
import PopupLogo from '../../assets/images/popup-logo.png';

import containerImage from '../../assets/images/create-org.jpg';
import mainBackground from '../../assets/images/login-2.jpg';
import CategoryGrid from '../components/CategoryGrid'
import OrgInfoTab from './org-info-tab';
import OrgInviteTab from './org-invite-tab';
import LoadingScreen from '../components/LoadingScreen'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const swal = withReactContent(Swal);
import SwalIcon from '../svg/swal-icon'
import './org-pub.css';

import 'pretty-checkbox';

const OrgPub = () => {
    const [countTab, setCountTab] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [users, setUsers] = useState([]);
    //validators
    const [errors, setErrors] = useState({});

    const [orgInfoForm, setOrgInfoForm] = useState({
        name: '', 
        email: '',
        site: '', 
        phone_number: '',
        description: '',
        location: '',
        lat: '',
        lng: ''
    });

    const handleOrgInfo = (e) => {
        const { name, value } = e.target
        setOrgInfoForm({ ...orgInfoForm,
            [name]: value
        })
        removeError(name)
    }

    const removeError= (name = '') => {
        delete errors[name]
        setErrors(errors)
    }


    const showTabTitle = () => {
        switch(countTab){
            case 1:
            return <h3>Organisation Information</h3>
            case 2:
            return <h3>Invite Staff</h3>
            case 3:
            return <h3>Please answer the questions below</h3>
            default:
            return '';
        }
    }

    const validateTab = (newCount) => {
        let set = {} 
        if(newCount > countTab)
            switch(countTab){
                case 1:
                set = {
                    name: orgInfoForm.name == '' ? 'Missing title' : null,
                    email: orgInfoForm.email == '' ? 'Missing Email' : null,
                    site: orgInfoForm.site == '' ? 'Missing Website' : null,
                    phone_number: orgInfoForm.phone_number == '' ? 'Missing Phone Number' : null,
                    description: orgInfoForm.description == '' ? 'Missing Description' : null,
                    location: orgInfoForm.location == '' ? 'Missing location' : null
                }
                if(Object.values(set).filter(i=>i).length > 0){
                    setErrors({
                        ...errors,
                        ...set
                    })
                    setCountTab(2)
                    return;
                }
                break;
                case 2:
                set = {
                    business_name: business_name == '' ? 'Missing business name' : null,
                    business_contact: business_contact == '' ? 'Missing business contract' : null
                }
                if(Object.values(set).filter(i=>i).length > 0){
                    setErrors({
                        ...errors,
                        ...set
                    })
                    return;
                } else {
                    delete errors.business_name;
                    delete errors.business_contact;
                    setErrors({...errors});
                }
                break;
                case 3:
                break;
            }

        setCountTab(newCount)
        return set;
    }

    const submit = (includeUsers = true) => {
        const set = validateTab(3);
        if(_.isEmpty({...set})){
            setSubmitting(true)

            const params = {
                ...orgInfoForm,
                category,
                users: includeUsers ? users : null,
            }
            api.post(`/api/org-create`, params)
                .then(({data})=>{
                setSubmitting(false)
                swal.fire({
                    text: `You successfully created "${orgInfoForm.name}"${users.length > 0 ? ' and invited ' + users.length + ' members' : ''}`,
                    imageUrl: PopupLogo,
                    title: 'Created New Organisation!',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                    onClose: () => {
                        window.location = '/login';
                    }
                })
                // handleForm(false, 'submit', data.data);
            }).catch(err=>{
                if(err.response){
                    const { data } = err.response
                    setErrors(data.errors || [])
                }
                setSubmitting(false)
            })
        } else {
            swalError();
        }
    }

    

    return (
        <section className="create-org-pub flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
            <section className="create-org-pub__container">
                <section className="left" style={{ backgroundImage:`url(${containerImage})` }}>
                    <div className="create-org-pub__logo">
                        <img src={Logo} />
                    </div>
                    <div>
                        <h2>Neuma Organisation</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur dolor</p>
                    </div>
                </section>
                <section className="right">
                    {
                        submitting && <LoadingScreen title="Creating your Organisation on Neuma..."/>
                    }
                    <div className="offers-create-form__header">
                        <h2>Create Organisation</h2>
                        <div className="relative pt-1">
                            <div className="w-full bg-gray-400 rounded-full">
                                <div className={`bg-blue-400 rounded-full leading-none py-1 text-white tab-${countTab}`}></div>
                            </div>
                            <p>{countTab} of 3</p>
                        </div>
                    </div>

                    <div className="offers-create-form__body">
                        { showTabTitle() }
                        { countTab == 1 && <OrgInfoTab orgData={orgInfoForm} handleOrgInfo={handleOrgInfo} setOrgInfoForm={setOrgInfoForm} setErrors={setErrors} removeError={removeError} errors={errors}/>}
                        { countTab == 2 && <OrgInviteTab users={users} submitting={submitting} setUsers={setUsers}/>}
                        { countTab == 3 && 'Something here'}
                    </div>

                    <div className={`create-org-pub__footer ${countTab == 3 ? 'create-org-pub__footer-cols-2' : ''} `}>
                        {
                            countTab == 3 &&
                                <span onClick={()=>submit(false)}>Skip and complete</span>
                        }
                        <div>
                            {
                                countTab > 1 &&
                                    <button className="primary-btn primary-btn--transparent" disabled={submitting} onClick={() => validateTab(countTab-1)}>Back</button>
                            }
                            {
                                (countTab < 3) 
                                ? (<button className="primary-btn" disabled={submitting} onClick={() => validateTab(countTab+1)}>Next</button>)
                                : (<button className="primary-btn" disabled={submitting} onClick={submit}>{submitting? 'Submitting...': 'Create'}</button>)
                            }
                        </div>
                    </div>

                </section>
            </section>
        </section>
    )
}

export default OrgPub;