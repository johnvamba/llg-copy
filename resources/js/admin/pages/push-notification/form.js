import React, { useState, useRef } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Calendar from '../../../svg/calendar';
import DatePicker from "react-datepicker";


const PushForm = ({ activeForm, handleCloseForm }) =>{

    const [toggleSched, setToggleSched] = useState('send now');
    const [meridiem, setMeridiem] = useState('AM');
    const [startDate, setStartDate] = useState(new Date());

    // enable to open datapicker when clicking calendar icon
    const calendarRef = useRef();

    const [fieldErrors, setFieldErrors] = useState({});
    const [fields, setFields] = useState({
        title: '',
        message: ''
    });
    const fieldErrorMsg = {
        title: 'Missing Title',
        message: 'Missing Message'
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

        setFieldErrors(errors);
        if(Object.keys(errors).length === 0) return true;
        return false;
    }

    const handleSubmit = () => {
        if(validateForm()) console.log('success');
    }

    return(
        <>
            <section className="push-form create-form">
                <header className="create-story__header">
                    <h2>{activeForm} Push Notification</h2>
                    <button type="button" onClick={handleCloseForm}>
                        <OffersFormCross />
                    </button>
                </header>
                <section className="push-form__body">
                    <form>
                        <div className="w-full xl:w-full">
                            <div className={`form-group form-input-text ${fieldErrors.title ? 'has-error' : ''}`}>
                                <label>Title</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Title"
                                    name="title"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="input-error-msg">{fieldErrors.title}</span>
                        </div>
                        <div className="w-full xl:w-full">
                            <div className={`form-group form-group-textarea ${fieldErrors.message ? 'has-error' : ''}`}>
                                <label>Notification</label>
                                <textarea
                                    type="text"
                                    placeholder="Enter Message"
                                    rows="3"
                                    name="message"
                                    onChange={handleInputChange}
                                >
                                </textarea>
                            </div>
                            <span className="txtarea-field input-error-msg">{fieldErrors.message}</span>
                        </div>
                        <div className="toggle-sched">
                            <label>Schedule</label>
                            <div className="toggle-sched__container">
                                <span className={toggleSched == 'send now' ? 'active' : null} onClick={() => setToggleSched('send now')}>Send Now</span>
                                <span className={toggleSched == 'send later' ? 'active' : null} onClick={() => setToggleSched('send later')}>Send Later</span>
                            </div>
                        </div>
                        {
                            activeForm === 'Edit' &&
                                <div className="flex justify-between flex-wrap -mx-2">
                                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                        <div className="form-group form-input-text">
                                            <label>Date</label>
                                            <div className="flex items-center">
                                                <DatePicker ref={calendarRef} selected={startDate} onChange={date => setStartDate(date)} />
                                                <i className="cursor-pointer" onClick={() => {calendarRef.current.setOpen(true)}}>
                                                    <Calendar/>
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                        <div className="form-group form-input-text">
                                            <label>Time</label>
                                            <div className="flex items-center justify-between">
                                                <input className="outline-none" type="time" />
                                                <div className="push-form__meridiem">
                                                    <span className={meridiem === 'AM' ? 'active' : null} onClick={() => setMeridiem('AM')}>AM</span>
                                                    <span className={meridiem === 'PM' ? 'active' : null} onClick={() => setMeridiem('PM')}>PM</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </form>
                </section>
                <footer className="org-form__footer">
                    <div className="flex">
                        <button className="discard" onClick={handleCloseForm}>Discard</button>
                        <button className="next" onClick={handleSubmit}>Add</button>
                    </div>
                </footer>
            </section>
        </>
    )
}


export default PushForm;