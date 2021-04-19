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
import OrgLogos from './org-logos';
import OrgInfoTab from './org-info-tab';
import OrgInviteTab from './org-invite-tab';
import OrgQuestion from './org-question';

import LoadingScreen from '../components/LoadingScreen'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const swal = withReactContent(Swal);
import SwalIcon from '../svg/swal-icon'
import './org-pub.css';
import { swalError } from '../components/helpers/alerts'
import { validateEmail, isValidated, validBenevityLink, parsePhone, validURL, validPhone } from '../components/helpers/validator'

import 'pretty-checkbox';

const OrgPub = () => {
    const [countTab, setCountTab] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [users, setUsers] = useState([]);
    const [phoneUnparse, setPhone] = useState(null);
    const [images, setImages] = useState({
        banner: null,
        photo: null
    })
    const [cropper, openCropper] = useState({
        url: null,
        type: 'banner'
    })
    //validators
    const [errors, setErrors] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
    });

    const [orgInfoForm, setOrgInfoForm] = useState({
        name: '', 
        email: '',
        site: '', 
        benevity_link: '',
        phone_number: '',
        description: '',
        location: '',
        lat: '',
        lng: ''
    });

    const [answers, setAnswers] = useState({
        acnc: false,
        fundraiser: false,
        insured: false,
        terms: false,
        taxable: false
    })

    const updateAnswers = (field = 'terms', state= false)=>{
        setAnswers({ ...answers, [field]: state })
        if(field == 'terms' && state)
            removeError(field)
    }

    const handleOrgInfo = (e) => {
        const { name, value } = e.target
        let parsed = null;
        // if(name == 'phone_number') {
        //     let unparsed = parsePhone(value, true);
        //     parsed = parsePhone(unparsed);
        //     setPhone(parsed);
        //     let test = validPhone(parsed);
        //     if(unparsed.length > 11)
        //         return;
        // }
        setOrgInfoForm({ ...orgInfoForm,
            [name]: parsed || value
        })
        removeError(name)
    }

    const removeError= (name = '') => {
        delete errors[name]
        setErrors(errors)
    }

    const removeFormError= (name = '') => {
        delete formErrors[name]
        setFormErrors(formErrors)
    }

    const showTabTitle = () => {
        switch(countTab){
            case 1:
            return <h3>Organisation Information</h3>
            case 2:
            return <h3>Upload your Logo & Banner</h3>
            case 3:
            return <h3>Primary Contact</h3>
            case 4:
            return <h3>Please answer the questions below</h3>
            default:
            return '';
        }
    }

    const validateTab = (newCount) => {
        let set = {} 
        if(newCount < countTab){
            setCountTab(newCount)
            return;
        }
        switch(countTab){
            case 1:
            set = {
                name: orgInfoForm.name == '' ? 'Missing title' : null,
                email: orgInfoForm.email == '' && !validateEmail(orgInfoForm.email) ? 'Missing Email' : null,
                // site: orgInfoForm.site ? 'Missing Website' : null,
                phone_number: !validPhone(orgInfoForm.phone_number) ? 'Missing Phone Number' : null,
                description: orgInfoForm.description == '' ? 'Missing Description' : null,
                location: orgInfoForm.location == '' ? 'Missing location' : null,
                benevity_link: !validBenevityLink(orgInfoForm.benevity_link) ? 'Invalid Benevity Link' : null,
            }
            break;
            case 2:
            set = {
                banner: images.banner == null ? 'Missing banner' : null,
                photo: images.photo == null ? 'Missing logo' : null
            }
            break;
            case 3:
            set = {
                users: (users.length == 0 && !validateEmail(form.email)) ? 'Missing primary contact or email invalid' : null
            }
            if(validateEmail(form.email)){
                addUser()
            }
            break;
            case 4:
            set = {
                terms: answers.terms ? null : 'Missing terms' ,
            }
            break;
            default:
            return {};
        }
        const valid = isValidated(set);
        // console.log('here', valid, set, errors)
        if(!_.isEmpty(valid) || !_.isEmpty(errors)){
            setErrors({
                ...errors,
                ...valid
            })
        } else {
            setCountTab(newCount)
        }
        return isValidated(set);
    }

    const handleImages = (file, type = 'photo', cropper = false) => {
        const reader = new FileReader();
        reader.onload = (e2) => {
            openCropper({ url: (cropper ? e2.target.result : null), type })
            setImages({
                ...images,
                [type]: e2.target.result
            })
            removeError(type)
        }
        reader.readAsDataURL(file)
    }

    const submit = (includeUsers = true) => {
        const set = validateTab(4);
        if(_.isEmpty({...set})){
            setSubmitting(true)

            const params = {
                ...orgInfoForm,
                ...answers,
                ...images,
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

    const handleOrgInvite = ({target}) => {
        setForm({ ...form, [target.name]: target.value })
    }
    const handleOrgInvitePhone = (phone) => {
        setForm({ ...form, phone })
    }

    const handlePhone = (phone_number, mask) => {
        removeError('phone_number');
        setOrgInfoForm({...orgInfoForm, phone_number})
    }

    const handleEmail = ({target})=>{
        const email = target.value
        setForm({ ...form, email })
        if(validateEmail(email)){
            removeError('email')
        }
    }

    const addUser = () => {
        if(!_.isEmpty(formErrors))
            return;
        if(form.email == ''){
            setFormErrors({email: 'Missing email'})
            return;
        }
        if(users.find(i => i.email == form.email)){
            setFormErrors({ email: 'Email already included'})
            return
        }
        if(!validateEmail(form.email)){
            setFormErrors({ email: 'Invalid Email'})
            return;
        }
        setUsers([...users, form])
        setForm({
            email: '',
            firstName: '',
            lastName: '',
            phone: ''
        })
    }
    

    return (
        <section className="create-org-pub flex items-center justify-center" style={{ backgroundImage:`url(${mainBackground})` }}>
            <section className="create-org-pub__container">
                <section className="left" style={{ backgroundImage:`url(${containerImage})` }}>
                    <div className="create-org-pub__logo">
                        <img src={Logo} />
                    </div>
                    <div>
                        <h2>Welcome to Neuma Care.</h2>
                        <p>Thanks for partnering with us to transform our city</p>
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
                                <div className={`bg-blue-400 rounded-full leading-none py-1 text-white`} style={{background: '#587B7F', width: `${parseFloat((countTab/4)*100).toFixed(0)}%`}}></div>
                            </div>
                            <p>{countTab} of 4</p>
                        </div>
                    </div>

                    <div className="offers-create-form__body">
                        { showTabTitle() }
                        { countTab == 1 && <OrgInfoTab orgData={orgInfoForm} handleOrgInfo={handleOrgInfo} handlePhone={handlePhone} setOrgInfoForm={setOrgInfoForm} setErrors={setErrors} removeError={removeError} errors={errors}/>}
                        { countTab == 2 && <OrgLogos images={images} setImages={setImages} cropper={cropper} openCropper={openCropper} handleImages={handleImages} removeError={removeError} errors={errors}/>}
                        { countTab == 3 && <OrgInviteTab 
                            users={users} 
                            submitting={submitting} 
                            setUsers={setUsers} 
                            errors={{...formErrors, users:errors.users}} 
                            form={form}
                            handleOrgInvite={handleOrgInvite}
                            handleEmail={handleEmail}
                            handleOrgInvitePhone={handleOrgInvitePhone}
                            addUser={addUser} />}
                        { countTab == 4 && <OrgQuestion answers={answers} updateAnswers={updateAnswers} userError={errors.users}/>}
                    </div>

                    <div className={`create-org-pub__footer ${countTab == 5 ? 'create-org-pub__footer-cols-2' : ''} `}>
                        {
                            /*(countTab == 2 || countTab == 3) &&
                                <span onClick={()=>submit(false)}>Skip and complete</span>*/
                        }
                        <div>
                            {
                                countTab > 1 &&
                                <button className="primary-btn primary-btn--transparent" disabled={submitting} onClick={() => validateTab(countTab-1)}>Back</button>
                            }
                            {
                                (countTab < 4) 
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