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

import DatePicker from 'react-datepicker';
registerPlugin(FilePondPluginImagePreview)

const NeedForm = ({handleForm}) => {
    const [type, setType] = useState('donation'); //donation
    const [people, setPeople] = useState(0); //donation
    const [files, setFiles] = useState([])
    const [goal, setGoal] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [meridiem, setMeridiem] = useState('am');

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
                    <Button className={type=='donation' ? 'active': ''} onClick={()=>setType('donation')}>Donation</Button>
                    <Button className={type=='fundraise' ? 'active': ''} onClick={()=>setType('fundraise')}>Fundraise</Button>
                    <Button className={type=='volunteer' ? 'active': ''} onClick={()=>setType('volunteer')}>Volunteer</Button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Select Category</label>
                    <div className="icon-categories">
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Employment
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Mechanic
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Cleaning
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Removalist
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Tutor
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Domestic & Family Violence
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Education
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Advocacy
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Children
                        </div>
                        <div className="icon-category">
                            <i className="icon-circle"><IconTest/></i>
                            Youth
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type='text' className="input-field" placeholder="Enter Title"/>
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
                            <input type='text' className="input-field" placeholder="Enter Title"/>
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
                                />
                            </div>
                        </div>
                        <div className="form-group short-width">
                            <label>Time</label>
                            <div className="input-container">
                                <input className="input-field time-field" type="time" pattern="[0-9]{2}:[0-9]{2}" placeholder="00:00" name="time"/>
                                <span className={`time-toggle time-am ${meridiem =='am' ? 'active':''}`} onClick={()=>setMeridiem('am')}>AM</span>
                                <span className={`time-toggle time-pm ${meridiem =='pm' ? 'active':''}`} onClick={()=>setMeridiem('pm')}>PM</span>
                            </div>
                        </div>
                        <div className="form-group short-width">
                            <label>Location</label>
                            <div className="input-container">
                                <span className="currency">$</span>
                                <input className="input-field space-l" type="text" placeholder="Enter Location" name="usrnm"/>
                            </div>
                        </div>
                        <div className="form-group short-width">
                            <label>Number of People Needed</label>
                            <div className="input-container">
                                <button className="numberButton" onClick={e=>updatePeople(people-1)}><i className="fas fa-minus"/></button>
                                <p className="numberValue">{people || 0}</p>
                                <button className="numberButton plus" onClick={e=>updatePeople(people+1)}><i className="fas fa-plus"/></button>
                            </div>
                        </div>
                    <div className="form-group w-full">
                        <label>What to bring</label>
                        <input type='text' className="input-field" placeholder="Enter Title"/>
                    </div>
                    </div>
                }
                <div className="form-group">
                    <label>Featured Image</label>
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        name="files"
                        labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
                      />
                </div>
            </div>
            <div className="form-footer">
                <Button className="btn btn-secondary" onClick={()=>handleForm(false, 'discard')}>Discard</Button>
                <Button className="btn btn-primary" onClick={()=>handleForm(false, 'submit')}>Create</Button>
            </div>
        </div>
    )
}
NeedForm.defaultProps = {
    handleForm: (toggle = false, type = null)=>{

    },
}
export default NeedForm;