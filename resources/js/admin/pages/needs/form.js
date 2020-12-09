import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button'
import { NavLink } from 'react-router-dom';
import { swalDelete } from '../../../components/helpers/alerts';
import { selectStyle, selectStylePaddingZero, loadOrganization } from '../../../components/helpers/async_options';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
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

import { connect } from 'react-redux';

const NeedForm = ({handleForm, data = {}, AuthUserReducer}) => {
    //user
    const { roles } = AuthUserReducer;
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
    const [time, setTime] = useState('');
    const [errors, setErrors] = useState({});
    const [location, setLocation] = useState({
        formatted_address: '',
        lat: null,
        lng: null,
    })
    const [meridiem, setMeridiem] = useState('am');
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
                bring,
                type,
                category = [],
                photo,
                goal,
                date,
                time,
                location,
            } = data.data
            setTitle(title || '');
            setAbout(about || description);
            setBring(bring || description);
            setType(type || 'donation');
            setCategory( all.filter(i => category.includes(i.name) ) );
            setPhoto(photo || null);
            setGoal(goal || 0);
            setDate(date || new Date);
            setTime(time || '');
            setLocation(location || {});
        })
        .catch(err => {
            // if(err.response){
            //     const { errors } = err.response
            //     setErrors(errors)
            // }
        }).then(()=>{
            setLoading(false)
        })

    }
    //Collect data from db if has new data.id
    useEffect(()=>{
        if(data.id) {
            collectData(data.id)
        } else {
            const { title, about, description, bring, type, category = [], photo, goal, date, time } = data || {}
            setTitle(title || '');
            setAbout(about || description || '');
            setBring(bring || description || '');
            setType(type || 'donation');
            setCategory( all.filter(i => category.includes(i.name) ) );
            setPhoto(photo || null);
            setGoal(goal || 0);
            setDate(date || new Date);
            setTime(time || '');
            setLocation(location || {});
        }
    }, [data])

    const updateGoal = (value)=>{
        if(value < 0)
            setGoal(0);
        else 
            setGoal(value);
    }

    const handleCategories = (item, truth = false) => {
        if(truth)
            setCategory(category.filter(i=>item.slug != i.slug))
        else 
            setCategory([item, ...category])
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

    const categoryWheel = event => {
        const { target } = event
        // target.scrollLeft += (event.deltaY / 10)
        console.log('onWheel', event.deltaY, target.scrollLeft)
        // target.scrollX += event.deltaY
    }

    const categoryScroll = event => {
        console.log('onScroll', event.target.scrollTop, event.target.scrollLeft)
    }

    const removePhoto = () => {

    }

    //Axios
    const submit = () => {
        setSubmitting(true)
        const submitPromise = !data.id ? 
            api.post(`/api/web/needs`, {
                title, type, category, goal, date, openDate, time, location, organization,
                photo,//files.length > 0 ? photo : null,
                description: about || bring || ''
            }) : 
            api.patch(`/api/web/needs/${data.id}`, { 
                title, type, category, goal, date, openDate, time, location, organization,
                photo,//files.length > 0 ? photo : null,
                description: about || bring || ''
            })

        submitPromise.then(({data})=>{
            setSubmitting(false)
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

    // if(loading)
    //     return (<div className="form need-form">
    //     <div className="form-title">
    //         <h3>Loading information of Need</h3>
    //         <button type="button" onClick={()=>handleForm(false, 'close')}>
    //             <CrossPlain />
    //         </button>
    //     </div>
    //     <div className="form-body">
    //         <p className="p-5">Please wait while we load your Need</p>
    //     </div>
    // </div>)

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
                <h3>Create Need</h3>
                <button type="button" onClick={()=>handleForm({}, false, 'close')}>
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
                    (roles.name == 'admin') && <div className={`form-group w-full ${errors.organization && 'form-error'}`}>
                        <label>Organization</label>
                        <AsyncSelect
                            styles={selectStylePaddingZero}
                            loadOptions={loadOrganization}
                            defaultOptions
                            value={organization}
                            placeholder="Organization"
                            onChange={setOrganization}
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
                        <div className={`form-group ${errors.goal && 'form-error'}`}>
                            <label>Goal</label>
                            <div className="input-container">
                                <span className="currency">$</span>
                                <input className="input-field space-l" type="number" placeholder="0.00" value={goal} name="goal" onChange={e=>updateGoal(e.target.value)}/>
                            </div>
                            {
                                (errors.goal || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Goal</span>
                            }
                        </div>
                        <div className={`form-group ${errors.description && 'form-error'}`}>
                            <label>About</label>
                            <textarea className="input-field" placeholder="Say something about this need" value={about} onChange={e=>setAbout(e.target.value)}/>
                            {
                                //
                            //<input type='text' className="input-field" placeholder="Say something about this need" value={about} onChange={e=>setAbout(e.target.value)}/>
                            }
                            {
                                (errors.description || false) && <span className="text-xs pt-1 text-red-500 italic">Missing About content</span>
                            }
                        </div>
                    </div>
                }
                {
                    type == 'volunteer' && 
                    <div className="flex-content">
                        <div className={`form-group short-width ${errors.date && 'form-error'}`}>
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
                            <div className="input-container">
                                <input className="input-field time-field" type="text" pattern="[0-9]{2}:[0-9]{2}" placeholder="00:00" name="time" value={time} 
                                onChange={(e)=>setTime(e.target.value)} />
                                <span className={`time-toggle time-am ${meridiem =='am' ? 'active':''}`} onClick={()=>setMeridiem('am')}>AM</span>
                                <span className={`time-toggle time-pm ${meridiem =='pm' ? 'active':''}`} onClick={()=>setMeridiem('pm')}>PM</span>
                            </div>
                            {
                                (errors.time || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Time of Need</span>
                            }
                        </div>
                        <Location 
                            className={`short-width ${errors.location && 'form-error'}`}
                            name={'location'}
                            placesSelected={handleLocation}
                            errors={errors.location || []}
                        />
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
                        <div className={`form-group w-full ${errors.description && 'form-error'}`}>
                            <label>What to bring</label>
                            <textarea className="input-field" placeholder="Enter things to bring" value={bring} onChange={e=>setBring(e.target.value)}/>
                            {
                                (errors.description || false) && <span className="text-xs pt-1 text-red-500 italic">Missing what to bring</span>
                            }
                        </div>
                    </div>
                }
                <Imagepond photo={photo} imageSelected={setPhoto} errors={errors.photo}/>
            </div>
            <div className="form-footer">
                <Button className="btn btn-secondary" onClick={()=>handleForm({},false, 'discard')} disabled={submitting}>Discard</Button>
                <Button className="primary-btn" onClick={submit} disabled={submitting}>Create</Button>
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