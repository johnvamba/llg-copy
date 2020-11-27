import React, { useState, useEffect } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { selectStylePaddingZero, loadOrganization } from '../../../components/helpers/async_options';
import { validateEmail, isValidated } from '../../../components/helpers/validator';
import { swalError } from '../../../components/helpers/alerts';
import CircleImageForm from '../../../components/CircleImageForm';

import AsyncSelect from 'react-select/async';
import Select from 'react-select';

const UsersForm = ({ data, showItem, handleForm }) => {
    const label = data.id ? 'Edit User' : 'Add User';
    const selectOptions = [
        { value: 'user', label: 'App User'},
        { value: 'organization admin', label: 'Organization User'},
        { value: 'campus admin', label: 'Campus User'},
        { value: 'admin', label: 'Super User'},
    ];
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        bio: '',
    })

    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState({ value: 'user', label: 'App User'});
    const [organization, setOrganization] = useState({});
    const [errors, setErrors] = useState({});

    const [submitting, setSubmitting] = useState(false);

    useEffect(()=>{
        if(data.id) {
            loadData()
        }
    }, [data])

    const loadData = () => {
        const { firstName, lastName, email, age, bio } = data
        setForm({
            firstName:firstName || '', 
            lastName:lastName || '', 
            email:email || '', 
            age:age || 0, 
            bio:bio || ''
        })
        setLoading(true)
        api.get(`/api/web/users/${data.id}`)
            .then(({data}) => {
                const { photo, type, organization } = data.data
                setPhoto(photo || '')
                setType( selectOptions.find(i => i.value == type) )
                setOrganization(organization || {})
            }).catch(({response})=>{
                setErrors({}) //set empty if success.
            }).finally(()=>{
                setLoading(false)
            })
    }

    const removeError= (name = '') => {
        delete errors[name]
        setErrors(errors)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({ ...form,
            [name]: value
        })
        removeError(name)
    }

    const handleType = (type) => {
        setType(type)
        removeError('type')
    }

    const handleOrganization = (organization) => {
        setOrganization(organization)
        removeError('organization')
    }

    const validateSubmit = (e) => {
        const { firstName, lastName, email, age, bio } = form
        const set = isValidated({
            firstName: firstName == '' ? "Missing first name" : null,
            lastName: lastName == '' ? "Missing last name" : null,
            email: !validateEmail(email) ? "Proper email required" : null,
            age: age <= 0 ? "Age not recognized" : null,
            bio: bio == '' ? 'Missing bio content' : null,
            photo: !photo ? 'Missing photo' : null,
            type: _.isEmpty(type) ? "Missing type" : null,
            organization: _.isEmpty(organization) ? "Missing organization" : null,
        })
        setErrors({...set})
        return set;
    }

    const attemptSubmit = ()=>{
        const set = validateSubmit()
        if(_.isEmpty({...set})){
            setSubmitting(true)
            const params = {
                ...form,
                type,
                organization,
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/users`, params) : 
                api.patch(`/api/web/users/${data.id}`, params )

            submitPromise.then(({data})=>{
                setSubmitting(false)
                handleForm(false, 'submit', data.data);
            }).catch(err=>{
                if(err.response){
                    const { data } = err.response
                    setErrors(data.errors || [])
                }
                setSubmitting(false)
            })
        } else {
            console.log('Errorlist', set)
            swalError('Invalid field content')
        }
    }

    const onChangePhoto = (file) => {
        const reader = new FileReader();
        reader.onload = (e2) => {
            setPhoto(e2.target.result)
        }
        reader.readAsDataURL(file)
    }

    const reset = () => {
        showItem({}, true)
        setForm({
            firstName: '',
            lastName: '',
            email: '',
            age: 0,
            bio: '',
        })
        setErrors({})
        setType({ value: 'app user', label: 'App User'})
        setOrganization({})
    }

    return (
        <section className="form users-form">
            {
                (submitting || loading) &&
                <LoadingScreen title={
                    (loading && 'Loading need...') ||
                    (submitting && (data.id ? 'Updating Transaction' : 'Creating Transaction')) ||
                    'Please wait'
                }/>
            }
            <header className="form-title mb-0">
                <h2>{label}</h2>
                <button type="button" onClick={() => showItem() }>
                    <OffersFormCross />
                </button>
            </header>
            <div className="form-body users-form__body content">
                <CircleImageForm src={photo} onChangeFile={onChangePhoto} error={errors.photo}/>
                {/*<div className="photo-circle">
                    <img
                        className="rounded-full image"
                        src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    />
                    <div>
                        <button>Upload Photo</button>
                        <p>Images should be atleast 300 x 300 px in pngo or jpeg file</p>
                    </div>
                </div>*/}
                <form className="form">
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group ${errors.firstName && 'form-error'}`}>
                                <label>First Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    value={form.firstName}
                                    onChange={handleInput}
                                />
                                {
                                    (errors.firstName || false) && <span className="text-xs pt-1 text-red-500 italic">Missing first name</span>
                                }
                            </div>
                            <div className={`form-group ${errors.email && 'form-error'}`}>
                                <label>Email Address</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    value={form.email}
                                    onChange={handleInput}
                                />
                                {
                                    (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">Missing email</span>
                                }
                            </div>
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group ${errors.lastName && 'form-error'}`}>
                                <label>Last Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    value={form.lastName}
                                    onChange={handleInput}
                                />
                                {
                                    (errors.lastName || false) && <span className="text-xs pt-1 text-red-500 italic">Missing last name</span>
                                }
                            </div>
                            <div className={`form-group ${errors.age && 'form-error'}`}>
                                <label>Age</label>
                                <input
                                    className="input-field"
                                    type="number"
                                    name="age"
                                    placeholder="Enter Age"
                                    value={form.age}
                                    onChange={handleInput}
                                />
                                {
                                    (errors.age || false) && <span className="text-xs pt-1 text-red-500 italic">Missing age</span>
                                }
                            </div>
                        </div>
                        <div className="w-full xl:w-full px-2">
                            <div className={`form-group ${errors.bio && 'form-error'}`}>
                                <label>Bio</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="bio"
                                    placeholder="Enter something about yourself"
                                    value={form.bio}
                                    onChange={handleInput}
                                />
                                {
                                    (errors.bio || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Bio</span>
                                }
                            </div>
                        </div>
                        {
                            loading && <div className="w-full">
                                <h3>Loading extra content</h3>
                            </div>
                        }
                        {
                            !loading &&
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className={`form-group ${errors.type && 'form-error'}`}>
                                    <label>User Type</label>
                                    <Select
                                        value={type}
                                        styles={selectStylePaddingZero}
                                        onChange={handleType}
                                        options={selectOptions}
                                    />
                                    {
                                        (errors.type || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Type</span>
                                    }
                                </div>
                            </div>
                        }
                        {
                            !loading && 
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className={`form-group ${errors.organization && 'form-error'}`}>
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
                                        (errors.organization || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organization</span>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </form>
            </div>

            <footer className="form-footer">
                <button className="btn-secondary" onClick={reset} disabled={submitting}>Discard</button>
                <button className="btn-primary" onClick={attemptSubmit} disabled={submitting}>{submitting ? 'Submitting' : (label == 'Add User' ? 'Add' : 'Update' ) }</button>
            </footer>
        </section>
    )
}
export default UsersForm;