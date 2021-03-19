import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button'
import { NavLink } from 'react-router-dom';
import { swalSuccess, swalDelete } from '../../../components/helpers/alerts';
import { selectStyle, selectStylePaddingZero, loadOrganization } from '../../../components/helpers/async_options';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import CurrencyInput from 'react-currency-input-field';
import { all } from '../needs/categorylist';

import "react-datepicker/dist/react-datepicker.css";

import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
//As test icon only
import IconTest from '../../../svg/icon-test'
import Calendar from '../../../svg/calendar'
import Location from '../../../components/Location'
import CategoryScroll from '../../../components/CategoryScroll'
import Imagepond from '../../../components/Imagepond'
import LoadingScreen from '../../../components/LoadingScreen'
import TimeInput from '../../../components/TimeInput'

import { connect, useSelector } from 'react-redux';

const NeedForm = ({handleForm, data = {}, AuthUserReducer}) => {
    //user
    const { roles } = AuthUserReducer;
    const loc = useSelector(({AuthUserReducer}) => AuthUserReducer.loc);
    //form
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [bring, setBring] = useState('');
    const [type, setType] = useState('donation'); //donation
    const [category, setCategory] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [goal, setGoal] = useState(0);
    const [date, setDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const [time, setTime] = useState('09:00 AM');
    const [errors, setErrors] = useState({});
    // const [address, setAddress] = useState('');
    const [location, setLocation] = useState({
        formatted_address: '',
        lat: -37.8180604,
        lng: 145.0001764
    })
    const [organization, setOrganization] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const collectData = (id) => {
        setLoading(true)
        api.get(`/api/web/needs/${id}`)
        .then(({data})=>{
            const { 
                title,
                about,
                description,
                requirements,
                type,
                lctype,
                category = [],
                organization = {},
                photo,
                goal,
                date,
                time,
                // address,
                location,
                lng,
                lat
            } = data.data
            setTitle(title || '');
            setAbout(about || description || '');
            setBring(requirements || '');
            setType(lctype || 'donation');
            setCategory( all.filter(i => category.includes(i.name) ) );
            setPhoto(photo || null);
            setGoal(goal || 0);
            setDate(date ? new Date(date) :  new Date);
            setTime(time || '');
            // setAddress(address || '');
            setLocation({
                formatted_address: location || organization.location, 
                lng:lng || organization.lng, 
                lat:lat || organization.lat
            });
            setOrganization(organization);
            setLoading(false)
        })
        .catch(err => {
            // if(err.response){
            //     const { errors } = err.response
            //     setErrors(errors)
            // }
        }).then(()=>{
        })

    }
    //Collect data from db if has new data.id
    useEffect(()=>{
        if(data.id) {
            collectData(data.id)
        } else {
            setTitle('')
            setAbout('')
            setBring('')
            setCategory([])
            setPhoto(null)
            setGoal(0)
            setDate(new Date)
            setOpenDate(false)
            setTime('09:00 AM')
            setErrors({})
            // setAddress('')
            setLocation({
                formatted_address: '',
                lat: -37.8180604,
                lng: 145.0001764
            })
            setOrganization({})
            setSubmitting(false)
            setLoading(false)
        }
        // console.log('trigger data', data);
    }, [data])

    useEffect(()=>{
        if(!_.isEmpty(loc)) {
            setLocation({
                formatted_address: loc.location || '',
                lat: loc.lat,
                lng: loc.lng
            })
        }
    }, [loc])

    const updateOrganization = (org) => {
        if(org.location) {
            setLocation({
                formatted_address: org.location || '',
                lat: org.lat,
                lng: org.lng
            })
        }
        setOrganization(org)
    }

    const updateGoal = (value, name)=>{
        setGoal(value);
    }

    const handleCategories = (item, truth = false) => {
        setCategory(truth ? category.filter(i=>item.slug != i.slug) : [item, ...category])
    }

    const handleType = (newType = 'donation') => {
        if(type != newType){
            setCategory([]);
        }
        setType(newType)
    }

    const handleLocation = ({formatted_address, geometry}) => {
        setLocation({
            location: formatted_address, 
            lat: geometry.location.lat(), 
            lng: geometry.location.lng()
        })
    }

    const removePhoto = () => {

    }
    //Axios
    const submit = () => {
        setSubmitting(true)
        const submit = { 
            title, type, category, goal, date, time, location, organization,
            photo,//files.length > 0 ? photo : null,
            // address,
            description: about,
            requirements: bring
        }
        const submitPromise = !data.id ? 
            api.post(`/api/web/needs`, submit) : 
            api.patch(`/api/web/needs/${data.id}`, submit)
        const data_id = data.id;
        submitPromise.then(({data})=>{
            setSubmitting(false)
            swalSuccess(data_id ? "Need has been updated": 'Need has been requested!')
            handleForm(data.data, false, 'submit');
        }).catch(err=>{
            // console.log('error', err, err.response)
            if(err.response){
                const { data } = err.response
                setErrors(data.errors || [])
            }
            setSubmitting(false)
        })
    }
    // console.log('handle form???', handleForm)
    return (
       <div className="form need-form">
            {
                (loading || submitting) &&
                <LoadingScreen title={
                    (loading && 'Loading need...') ||
                    (submitting && (data.id ? 'Updating Need' : 'Creating Need')) ||
                    'Please wait'
                }/>
            }
            <div className="form-title">
                <h3>{data.id ? 'Edit' : 'Create'} Need</h3>
                <button type="button" onClick={()=>handleForm()}>
                    <CrossPlain />
                </button>
            </div>
            <div className="form-body">
                <div className="form-group">
                    <label>Select Type of Need</label>
                    <div className="button-group">
                    <Button className={type=='donation' ? 'active': ''} onClick={()=>handleType('donation')}>Donation</Button>
                    <Button className={type=='fundraise' ? 'active': ''} onClick={()=>handleType('fundraise')}>Fundraise</Button>
                    <Button className={type=='volunteer' ? 'active': ''} onClick={()=>handleType('volunteer')}>Volunteer</Button>
                    </div>
                </div>
                {
                    //Set user priveledges here.. campus users will need to know what organization is asking for need.
                    (roles.name == 'admin' || roles.name == 'campus admin') && <div className={`form-group w-full ${errors.organization && 'form-error'}`}>
                        <label>Organization</label>
                        <AsyncSelect
                            styles={selectStylePaddingZero}
                            loadOptions={loadOrganization}
                            defaultOptions
                            cacheOptions
                            value={organization}
                            placeholder="Organization"
                            onChange={updateOrganization}
                            />
                        {
                            (errors.organization || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organization</span>
                        }
                    </div>
                }
                <CategoryScroll 
                    type={['donation', 'fundraise'].includes(type) ? 'monetary' : type}
                    selectedCategories={category} 
                    handleCategories={handleCategories}
                    errors={errors.category}
                />
                <div className={`form-group ${errors.title && 'form-error'}`}>
                    <label>Title</label>
                    <input type='text' className="input-field" placeholder="Enter Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                    {
                        (errors.title || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Title</span>
                    }
                </div>
                {
                    (type == 'donation' || type == 'fundraise') && 
                    <div>
                        {/* if this requires improvement check this out. https://codepen.io/559wade/pen/LRzEjj*/}
                        <div className={`form-group ${errors.goal && 'form-error'}`}>
                            <label>Goal</label>
                            <div className="input-container">
                                <span className="currency">$</span>
                                <CurrencyInput
                                  id="input-example"
                                  className="input-field space-l"
                                  name="goal"
                                  placeholder="value"
                                  value={goal}
                                  decimalsLimit={2}
                                  onValueChange={updateGoal}
                                />
                                {
                                    /*
                                <input className="input-field space-l" type="number" placeholder="0.00" value={goal} name="goal" onChange={e=>updateGoal(e.target.value)}/>
                                    */
                                }
                            </div>
                            {
                                (errors.goal || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Goal</span>
                            }
                        </div>
                        <Location 
                            className={`short-width ${errors.location && 'form-error'}`}
                            name={'location'}
                            defaultValue={location.formatted_address}
                            placesSelected={handleLocation}
                            errors={errors.location || []}
                        />
                        <div className={`form-group ${errors.description && 'form-error'}`}>
                            <label>About</label>
                            <textarea className="input-field" placeholder="Say something about this need" value={about} onChange={e=>setAbout(e.target.value)}/>
                            {
                                (errors.description || false) && <span className="text-xs pt-1 text-red-500 italic">Missing About content</span>
                            }
                        </div>
                    </div>
                }
                {
                    type == 'volunteer' && 
                    <div className="flex-content">
                        <div className={`form-group w-full ${errors.description && 'form-error'}`}>
                            <label>Volunteer Opportunity Information</label>
                            <input type="text" className="input-field" placeholder="Enter Information" value={about} onChange={e=>setAbout(e.target.value)}/>
                            {
                                (errors.description || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Volunteer Opportunity Information</span>
                            }
                        </div>
                        <div className={`form-group w-full ${errors.requirements && 'form-error'}`}>
                            <label>Requirements</label>
                            <textarea className="input-field" placeholder="Enter things to bring" value={bring} onChange={e=>setBring(e.target.value)}/>
                            {
                                (errors.requirements || false) && <span className="text-xs pt-1 text-red-500 italic">Missing what to bring</span>
                            }
                        </div>
                        <div className={`form-group short-width ${errors.date ? 'form-error' : ''}`}>
                            <label>Date Needed</label>
                            <div className="input-container">
                                <DatePicker 
                                    dateFormat="MMM dd, yyyy"
                                    selected={date} 
                                    name="date" 
                                    showPopperArrow={false} 
                                    className="input-field"
                                    onChange={(date)=>setDate(date)}
                                    onClickOutside={()=>setOpenDate(false)}
                                    onFocus={()=>setOpenDate(true)}
                                    open={openDate}
                                />
                                <i className="icon right-0 absolute" onClick={e=>setOpenDate(!openDate)}>
                                    <Calendar/>
                                </i>
                            </div>
                            {
                                (errors.date || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Date of Need</span>
                            }
                        </div>
                        <div className={`form-group short-width ${errors.time && 'form-error'}`}>
                            <label>Time</label>
                            <TimeInput value={time} onChange={setTime}/>
                            {
                                (errors.time || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Time of Need</span>
                            }
                        </div>
                        <div className={`form-group short-width ${errors.goal && 'form-error'}`}>
                            <label>Number of People Needed</label>
                            <div className="input-container">
                                <button className="numberButton" onClick={e=>updateGoal(goal-1)}><i className="fas fa-minus"/></button>
                                <input className="numberValue" type="number" value={goal || 0} onChange={e=>updateGoal(parseInt(e.target.value))} style={{width: goal.toString().length + 'ch'}}/>
                                <button className="numberButton plus" onClick={e=>updateGoal(goal+1)}><i className="fas fa-plus"/></button>
                            </div>
                            {
                                (errors.goal || false) && <span className="text-xs pt-1 text-red-500 italic">Missing number of people</span>
                            }
                        </div>
                        <Location 
                            className={`w-full ${errors.location && 'form-error'}`}
                            name={'location'}
                            defaultValue={location.formatted_address}
                            placesSelected={handleLocation}
                            errors={errors.location || []}
                        />
                        
                    </div>
                }
                <Imagepond photo={photo} imageSelected={setPhoto} errors={errors.photo}/>
            </div>
            <div className="form-footer">
                <Button className="btn btn-secondary" onClick={()=>handleForm({}, true, 'discard')} disabled={submitting}>Discard</Button>
                <Button className="btn btn-primary" onClick={submit} disabled={submitting}>{data.id ? 'Save' :'Create'}</Button>
            </div>
        </div>
    )
}
NeedForm.defaultProps = {
    handleForm: (toggle = false, type = null)=>{

    }
}
export default connect(({AuthUserReducer})=>{
    return {
        AuthUserReducer
    }
},(dispatch)=>{
    return {

    }
})(NeedForm);