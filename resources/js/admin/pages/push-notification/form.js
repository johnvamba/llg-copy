import React, { useState, useEffect, useRef } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Calendar from '../../../svg/calendar';
import DatePicker from "react-datepicker";


const PushForm = ({ data={}, activeForm, handleForm }) =>{
    const [toggleSched, setToggleSched] = useState('now');
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

    useEffect(() => {
        if(data.id) {
            const { title, message } = data
            setFields({title, message});
        }
    }, [data])

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
        if(validateForm()) 
        {

        }
    }

    const onClear = () => {
        handleForm();
    }

    return(
        <section className="form push-form create-form">
            <header className="form-title create-story__header">
                <h3>{activeForm} Push Notification</h3>
                <button type="button" onClick={handleForm}>
                    <OffersFormCross />
                </button>
            </header>
            <section className="form-body push-form__body">
                <form>
                    <div className="w-full xl:w-full">
                        <div className={`form-group ${fieldErrors.title ? 'has-error' : ''}`}>
                            <label>Title</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Enter Title"
                                name="title"
                                value={fields.title || ''}
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
                                value={fields.message || ''}
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
                            <span className={toggleSched == 'now' ? 'active' : null} onClick={() => setToggleSched('now')}>Send Now</span>
                            <span className={toggleSched == 'later' ? 'active' : null} onClick={() => setToggleSched('later')}>Send Later</span>
                        </div>
                    </div>
                    {
                        data.id &&
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
            <footer className="form-footer org-form__footer">
                <button className="btn btn-secondary" onClick={onClear}>Discard</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
            </footer>
        </section>
    )
}


export default PushForm;