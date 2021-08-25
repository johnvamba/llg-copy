import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import OffersFormCross from '../../../svg/offers-form-cross';

import { selectStylePaddingZero, loadOrganization, loadCampus } from '../../../components/helpers/async_options';
import { validateEmail, isValidated, validPhone } from '../../../components/helpers/validator';
import { swalError, swalSuccess } from '../../../components/helpers/alerts';
import {IMaskInput} from 'react-imask';
import CircleImageForm from '../../../components/CircleImageForm';
import LoadingScreen from '../../../components/LoadingScreen';
import ImageCropper from '../../../components/ImageCropper'
import Location from '../../../components/Location'

const selOption = [
    { value: 'user', label: 'App User'},
    { value: 'organization admin', label: 'Organisation User'},
    { value: 'campus admin', label: 'Location User'},
    { value: 'admin', label: 'Super User'},
];

const UsersForm = ({ data, showItem, handleForm }) => {
    const label = data.id ? 'Edit User' : 'Add User';
    const [selectOptions, setSelectOptions] = useState([...selOption]);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        mobile_number: '(02) 00000-0000',
        bio: '',
    })
    const [location, setLocation] = useState({
        location: '',
        lat: -37.8136, 
        lng: 144.9631
    })
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState({ value: 'user', label: 'App User'});
    const [organization, setOrganization] = useState({});
    const [errors, setErrors] = useState({});
    const [campus, setCampus] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const roles = useSelector(state => state.AuthUserReducer.roles);
    const [numbRef, setNumbRef] = useState(null);
    const [cropper, openCropper] = useState({
        url: null,
        cropTarget: 'banner'
    })

    useEffect(()=> {
        switch (roles.name) {
            case 'campus admin':
            setSelectOptions(selOption.filter(i => i.value != 'admin'))
            break;
            case 'organization admin':
            setSelectOptions(selOption.filter(i => i.value != 'admin' || i.value != 'campus admin'))
            break;
            case 'admin':
            setSelectOptions([...selOption]);
            break;
            default:
            break;
        }
    }, [roles])

    useEffect(()=>{
        if(data.id) {
            loadData()
        } else {
            // console.log('Error??')
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                age: 0,
                mobile_number: '(02) 00000-0000',
                bio: '',
            })
            setLoading(false)
            setPhoto(null)
            setType({ value: 'user', label: 'App User'})
            setOrganization({})
            setErrors({})
            setLocation({
                location: 'Melbourne, Australia',
                lat: -37.8136, 
                lng: 144.9631
            })
            setSubmitting(false)
        }
    }, [data])

    const loadData = () => {
        const { firstName, lastName, email, age, bio, mobile_number } = data
        setForm({
            firstName:firstName || '', 
            lastName:lastName || '', 
            email:email || '', 
            age:age || 0,
            mobile_number: mobile_number || '(02) 0000 0000',
            bio:bio || ''
        })
        setLoading(true)
        api.get(`/api/web/users/${data.id}`)
            .then(({data}) => {
                const { photo, type, organization, campus, location, lng, lat } = data.data
                setPhoto(photo || '')
                setType( selectOptions.find(i => i.value == type) )
                setOrganization(organization || {})
                setCampus(campus)
                setLocation({
                    location: location || 'Melbourne, Australia',
                    lat: lat || -37.8136, 
                    lng: lng || 144.9631
                })
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

    const handleCampus = (campus) => {
        setCampus(campus)
        removeError('campus')
    }

    const handleLocation = ({formatted_address, geometry}) => {
        setLocation({
            location: formatted_address, 
            lat: geometry.location.lat(), 
            lng: geometry.location.lng()
        })
    }

    const validateSubmit = (e) => {
        const { firstName, lastName, email, age, bio, mobile_number } = form
        const set = isValidated({
            firstName: firstName == '' ? "Missing first name" : null,
            lastName: lastName == '' ? "Missing last name" : null,
            email: !validateEmail(email) ? "Proper email required" : null,
            age: age <= 0 ? "Age not recognized" : null,
            bio: bio == '' ? 'Missing bio content' : null,
            photo: !photo ? 'Missing photo' : null,
            type: _.isEmpty(type) ? "Missing type" : null,
            organization: (_.isEmpty(organization) && type.value == 'organization admin') ? "Missing organisation" : null,
            campus: (_.isEmpty(campus) && type.value == 'campus admin') ? "Missing location" : null,
            mobile_number: !validPhone(mobile_number)  ? "Missing mobile number" : null
        })
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
                campus,
                photo
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/users`, params) : 
                api.patch(`/api/web/users/${data.id}`, params )
            const data_id = data.id
            submitPromise.then(({data})=>{
                setSubmitting(false)
                swalSuccess(data_id ? "User has been updated": 'User has been created!');
                handleForm(false, 'submit', data.data);
            }).catch(err=>{
                if(err.response){
                    const { data } = err.response
                    setErrors(data.errors || [])
                }
                setSubmitting(false)
            })
        } else {
            setErrors({...set})
            // console.log('Errorlist', set)
            swalError('Invalid field content')
        }
    }

    const onChangePhoto = (file) => {
        const reader = new FileReader();
        reader.onload = (e2) => {
            openCropper({ url: e2.target.result, cropTarget: 'photo' })
            setPhoto(e2.target.result)
        }
        reader.readAsDataURL(file)
    }

    const handlePhoto = (imageData = null)=>{
        setPhoto(imageData);
        // setCropTarget(null)
    }

    const closeCropper=()=>{
        openCropper({url: null, cropTarget: 'photo'})
    }

    const reset = () => {
        showItem({}, true)
        // setForm({
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     age: 0,
        //     bio: '',
        // })
        // setErrors({})
        // setType({ value: 'app user', label: 'App User'})
        // setOrganization({})
    }

    const setNumber = (mobile_number, mask) => {
        removeError('mobile_number');
        setForm({...form, mobile_number})
    }

    return (
        <section className="form users-form">
            {
                (submitting || loading) &&
                <LoadingScreen title={
                    (loading && 'Loading User...') ||
                    (submitting && (data.id ? 'Updating User' : 'Creating User')) ||
                    'Please wait'
                }/>
            }
            {
                cropper.url && <ImageCropper aspect={cropper.cropTarget == 'banner' ?  (14/5) : 1} originalImage={cropper.url} 
                    onImageCropped={handlePhoto}
                    circle={ cropper.cropTarget == 'photo'}
                    closeCropper={closeCropper} />
            }
            <header className="form-title mb-0">
                <h2>{label}</h2>
                <button type="button" onClick={() => showItem() }>
                    <OffersFormCross />
                </button>
            </header>
            <div className="form-body users-form__body content">
                <CircleImageForm src={photo} onChangeFile={onChangePhoto} error={errors.photo} editForm={label == 'Edit User' ? true : false} />
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
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group ${errors.mobile_number && 'form-error'}`}>
                                <label>Mobile Number</label>
                                {/* check libphonenumber-js for this improvement */}
                                <IMaskInput
                                    className="input-field"
                                  mask={'00 0000 0000 [00]'}
                                  value={form.mobile_number || ''}
                                  unmask={false} 
                                  inputRef={setNumbRef}
                                  onComplete={setNumber}
                                  placeholder='Enter number here'
                                />
                                {/*<input
                                    className="input-field"
                                    type="string"
                                    name="mobile_number"
                                    placeholder="Enter Mobile Number"
                                    value={form.mobile_number}
                                    onChange={handleInput}
                                />*/}
                                {
                                    (errors.mobile_number || false) && <span className="text-xs pt-1 text-red-500 italic">Missing or wrong mobile number</span>
                                }
                            </div>
                        </div>
                        <div className="w-full xl:w-full px-2">
                            <Location 
                                className={`short-width ${errors.location && 'form-error'}`}
                                name={'location'}
                                label={"Default Location"}
                                defaultValue={location.location}
                                placesSelected={handleLocation}
                                errors={errors.location || []}
                            />
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
                            (!loading && type.value == 'organization admin') && 
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className={`form-group ${errors.organization && 'form-error'}`}>
                                    <label>Organization</label>

                                   <AsyncSelect
                                        styles={selectStylePaddingZero}
                                        loadOptions={loadOrganization}
                                        cacheOptions
                                        defaultOptions
                                        value={organization}
                                        placeholder="Organization"
                                        onChange={handleOrganization}
                                        />
                                    {
                                        (errors.organization || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organisation</span>
                                    }
                                </div>
                            </div>
                        }
                        {
                            (!loading && type.value == 'campus admin') && 
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className={`form-group ${errors.campus && 'form-error'}`}>
                                    <label>Location</label>
                                   <AsyncSelect
                                        styles={selectStylePaddingZero}
                                        loadOptions={loadCampus}
                                        cacheOptions
                                        defaultOptions
                                        value={campus}
                                        placeholder="Campus"
                                        onChange={handleCampus}
                                        />
                                    {
                                        (errors.campus || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Location</span>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </form>
            </div>

            <footer className="form-footer">
                <button className="btn-secondary" onClick={reset} disabled={submitting}>Discard</button>
                <button className="primary-btn" onClick={attemptSubmit} disabled={submitting}>{submitting ? 'Submitting' : (label == 'Add User' ? 'Add' : 'Update' ) }</button>
            </footer>
        </section>
    )
}
export default UsersForm;