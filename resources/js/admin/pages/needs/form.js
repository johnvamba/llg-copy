import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button'
import { NavLink } from 'react-router-dom';
import { swalDelete } from '../../../components/helpers/alerts';
//images
import { FilePond, File, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "react-datepicker/dist/react-datepicker.css";

import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
//As test icon only
import IconTest from '../../../svg/icon-test'
import Calendar from '../../../svg/calendar'
import Location from '../../../components/Location'

import DatePicker from 'react-datepicker';
registerPlugin(FilePondPluginImagePreview)

import { monetary, volunteer } from './categorylist'

const CatComponent = ({cat, onSelect, truth = false}) => {
    return <div className={`icon-category ${truth ? 'active':''}`} onClick={()=>onSelect(cat, truth)}>
        <i className={`icon-circle`}>
            { truth &&
                <Check className="svg-check" fill='#109CF1'/>
            }
            <cat.svg_class className="svg-icon" active={truth} />
        </i>
        {cat.title || 'unknown'}
    </div>
}

const NeedForm = ({handleForm, data = {}}) => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [bring, setBring] = useState('');
    const [type, setType] = useState('donation'); //donation
    const [people, setPeople] = useState(0); //donation
    const [category, setCategory] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [files, setFiles] = useState([])
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

    const collectData = (id) => {

    }
    //Collect data from db if has new data.id
    useEffect(()=>{
        if(data.id) {
            api.get('')
            .then(()=>{
                setTitle();
                setAbout();
                setType();
                setPeople();
                setCategory();
                setFiles();
                setGoal();
                setDate();
                setOpenDate();
                setTime();
                setLocation();
            })
            .catch(err => {
                setErrors(err)
            })
        }
    }, [data])

    const updateGoal = (value)=>{
        if(value < 0)
            setGoal(0);
        else 
            setGoal(value);
    }

    const updatePeople = (value)=>{
        if(value < 0)
            setPeople(0)
        else
            setPeople(value);
    }

    const handleCategories = (item, truth = false) => {
        console.log('selected',category)
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
    const handleImage = (files)=>{
        console.log('handle incoming files', files);
        setFiles([...files]);
        let reader = new FileReader();
        reader.onload = (e) => {
            console.log('reading');
            // let inputs = { ...form };
            setPhoto(e.target.result);
        };
        reader.readAsDataURL(files[0]);
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

    //Axios
    const submit = () => {
        //Do quick validations here


        const submitPromise = !data.id ? 
            api.post(`/api/admin/needs`, {
                title, about, bring, type, people, category, photo, goal, date, openDate, time, errors, location
            }) : 
            api.update(`/api/admin/needs/${data.id}`, {
                params: {title, about, bring, type, people, category, photo, goal, date, openDate, time, errors, location}
            })

        submitPromise.then(res=>{
            handleForm(false, submit);
        }).catch(err=>{

        })
    }

    return (
       <div className="form need-form">
            <div className="form-title">
                <h3>Create Need</h3>
                <button type="button" onClick={()=>handleForm(false, 'close')}>
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
                <div className="form-group">
                    <label>Select Category</label>
                    <div className="icon-categories"
                        onWheel={categoryWheel}
                        onScroll={categoryScroll}>
                        {
                            (type == 'donation' || type == 'fundraise') ?
                            monetary.map((cat, ind)=><CatComponent key={cat.slug} 
                                cat={cat}
                                truth={category.findIndex(i=> cat.slug == i.slug) >= 0}
                                onSelect={handleCategories}
                                />) 
                            :   
                            volunteer.map((cat, ind)=><CatComponent key={cat.slug} 
                                cat={cat}
                                truth={category.findIndex(i=> cat.slug == i.slug) >= 0}
                                onSelect={handleCategories}
                                />)
                        }
                    </div>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type='text' className="input-field" placeholder="Enter Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                </div>
                {
                    (type == 'donation' || type == 'fundraise') && 
                    <div>
                        <div className="form-group">
                            <label>Goal</label>
                            <div className="input-container">
                                <span className="currency">$</span>
                                <input className="input-field space-l" type="number" placeholder="0.00" value={goal} name="goal" onChange={e=>updateGoal(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>About</label>
                            <input type='text' className="input-field" placeholder="Say something about this need" value={about} onChange={e=>setAbout(e.target.value)}/>
                        </div>
                    </div>
                }
                {
                    type == 'volunteer' && 
                    <div className="flex-content">
                        <div className="form-group short-width">
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
                        </div>
                        <div className="form-group short-width">
                            <label>Time</label>
                            <div className="input-container">
                                <input className="input-field time-field" type="text" pattern="[0-9]{2}:[0-9]{2}" placeholder="00:00" name="time" value={time} 
                                onChange={(e)=>setTime(e.target.value)} />
                                <span className={`time-toggle time-am ${meridiem =='am' ? 'active':''}`} onClick={()=>setMeridiem('am')}>AM</span>
                                <span className={`time-toggle time-pm ${meridiem =='pm' ? 'active':''}`} onClick={()=>setMeridiem('pm')}>PM</span>
                            </div>
                        </div>
                        <Location 
                            className={'short-width'}
                            name={'location'}
                            placesSelected={handleLocation}
                            errors={errors.location || []}
                        />
                        <div className="form-group short-width">
                            <label>Number of People Needed</label>
                            <div className="input-container">
                                <button className="numberButton" onClick={e=>updatePeople(people-1)}><i className="fas fa-minus"/></button>
                                <input className="numberValue" type="number" value={people || 0} onChange={e=>updatePeople(parseInt(e.target.value))} style={{width: people.toString().length + 'ch'}}/>
                                {
                                    //<p className="numberValue">{people || 0}</p>
                                }
                                <button className="numberButton plus" onClick={e=>updatePeople(people+1)}><i className="fas fa-plus"/></button>
                            </div>
                        </div>
                        <div className="form-group w-full">
                            <label>What to bring</label>
                            <input type='text' className="input-field" placeholder="Enter things to bring" value={bring} onChange={e=>setBring(e.target.value)}/>
                        </div>
                    </div>
                }
                <div className="form-group">
                    <label>Featured Image</label>
                    <FilePond
                        files={files}
                        onupdatefiles={handleImage}
                        allowMultiple={false}
                        name="files"
                        labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
                      />
                </div>
            </div>
            <div className="form-footer">
                <Button className="btn btn-secondary" onClick={()=>handleForm(false, 'discard')}>Discard</Button>
                <Button className="btn btn-primary" onClick={submit}>Create</Button>
            </div>
        </div>
    )
}
NeedForm.defaultProps = {
    handleForm: (toggle = false, type = null)=>{

    }
}
export default NeedForm;