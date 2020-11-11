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
                            <div className="form-group form-input-text">
                                <label>Title</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Title"
                                />
                            </div>
                        </div>
                        <div className="w-full xl:w-full">
                            <div className="form-group form-group-textarea">
                                <label>Notification</label>
                                <textarea type="text" placeholder="Enter Message" rows="3"></textarea>
                            </div>
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
                        <button className="next">Add</button>
                    </div>
                </footer>
            </section>
        </>
    )
}


export default PushForm;