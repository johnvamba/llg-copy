import React, { useState, useEffect, useRef } from 'react';
import { selectStyle, selectStylePaddingZero, loadOrganization, loadCampus, loadGroups, loadNeeds } from '../../../components/helpers/async_options';
import OffersFormCross from '../../../svg/offers-form-cross';
import Calendar from '../../../svg/calendar';
import DatePicker from "react-datepicker";
import AsyncSelect from 'react-select/async';
import TimeInput from '../../../components/TimeInput'

const PushForm = ({ data={}, handleForm }) =>{
    const [toggleSched, setToggleSched] = useState('now');
    const [time, setTime] = useState('10:00 AM');
    const [date, setStartDate] = useState(new Date());
    const [sendType, selectType] = useState('all');
    const [target, setTarget] = useState({});

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
            const { title, message, schedule_date, schedule_time } = data
            setFields({title, message});
            setStartDate(new Date(schedule_date));
            setTime(schedule_time || '9:00 AM');

        }
    }, [data])

    useEffect(() => {
        setTarget({});
    }, [sendType])

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

    const loadAsync = (a, b) => {
        switch (sendType) {
            case 'group':
            loadGroups(a, b);
            break;
            case 'organisation':
            loadOrganization(a, b);
            break;
            case 'campus':
            loadCampus(a, b);
            break;
            case 'volunteers':
            loadNeeds(a, b, { type: 'Volunteer'})
            break;
            case 'donators':
            loadNeeds(a, b, { type: ['Donation', 'Fundraise']})
            break;
        }
    }

    const handleSubmit = () => {
        if(validateForm()) 
        {
            const submit = {
                ...fields,
                sendType,
                target,
                toggleSched,
                date,
                time
            };
            const submitPromise = !data.id ? 
            api.post(`/api/web/pushs`, submit) : 
            api.patch(`/api/web/pushs/${data.id}`, submit)
            const data_id = data.id;
            submitPromise.then(({data})=>{
                handleForm({}, false, 'submit');
            })
        }
    }

    const onClear = () => {
        handleForm();
    }

    return(
        <section className="form push-form create-form">
            <header className="form-title create-story__header">
                <h3>Push Notification</h3>
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
                        (toggleSched == 'later') &&
                        <div className="flex justify-between flex-wrap -mx-2">
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className="form-group form-input-text">
                                    <label>Date</label>
                                    <div className="flex items-center">
                                        <DatePicker ref={calendarRef} selected={date} onChange={date => setStartDate(date)} />
                                        <i className="cursor-pointer" onClick={() => {calendarRef.current.setOpen(true)}}>
                                            <Calendar/>
                                        </i>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className="form-group p-2 mb-0">
                                    <label>Time</label>
                                    <TimeInput value={time} onChange={setTime}/>

                                   {/* <div className="flex items-center justify-between">
                                        <input className="outline-none" type="time" />
                                        <div className="push-form__meridiem">
                                            <span className={meridiem === 'AM' ? 'active' : null} onClick={() => setMeridiem('AM')}>AM</span>
                                            <span className={meridiem === 'PM' ? 'active' : null} onClick={() => setMeridiem('PM')}>PM</span>
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                    }
                    <div className="w-full xl:w-full">
                        <div className={`form-group ${fieldErrors.message ? 'has-error' : ''}`}>
                        <label>Send to</label>
                        <div className="input-container">
                            <select name="date-type" value={sendType} onChange={(e)=>selectType(e.target.value)}>
                                <option value="all">All Active Users</option>
                                <option value="group">Group Users</option>
                                <option value="organisation">Organisation Admins</option>
                                <option value="campus">Campus Admins</option>
                                <option value="volunteers">Need Volunteers</option>
                                <option value="donators">Need Donators</option>
                            </select>
                        </div>
                        {
                            sendType != 'all' && <label>Target instance</label>
                        }
                        {
                            sendType != 'all' && <AsyncSelect
                                key={sendType}
                                styles={selectStylePaddingZero}
                                loadOptions={loadAsync}
                                defaultOptions
                                cacheOptions
                                value={target}
                                placeholder="Select From"
                                onChange={setTarget}
                            />
                        }
                        </div>
                    </div>
                </form>
            </section>
            <footer className="form-footer org-form__footer">
                <button className="btn btn-secondary" onClick={onClear}>Discard</button>
                <button className="primary-btn" onClick={handleSubmit}>Send</button>
            </footer>
        </section>
    )
}


export default PushForm;