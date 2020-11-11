import React, { useState } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Camera from '../../../svg/camera';

const CampusForm = ({ handleClose, activeForm }) => {

    const [fieldErrors, setFieldErrors] = useState({});
    const [fields, setFields] = useState({
        name: '',
        location: '',
        description: ''
    });
    const fieldErrorMsg = {
        name: 'Missing Campus Name',
        location: 'Missing Location',
        description: 'Missing Description'
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
            <section className="campus-form create-form">
                <header className="create-story__header">
                    <h2>{activeForm} Campus</h2>
                    <button type="button" onClick={handleClose}>
                        <OffersFormCross />
                    </button>
                </header>
                <section className="campus-form__body">
                    <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}}>
                        <button>
                            <Camera /> 
                            Add Cover
                        </button>
                    </div>
                    <form>
                        <div className="w-full">
                            <div className={`form-group form-input-text ${fieldErrors.name ? 'has-error' : ''}`}>
                                <label>Campus Name</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Campus Name"
                                    name="name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="input-error-msg">{fieldErrors.name}</span>
                        </div>
                        <div className="w-full">
                            <div className={`form-group form-input-text ${fieldErrors.location ? 'has-error' : ''}`}>
                                <label>Location</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Location"
                                    name="location"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="input-error-msg">{fieldErrors.location}</span>
                        </div>
                        <div className="w-full">
                            <div className={`form-group form-group-textarea ${fieldErrors.description ? 'has-error' : ''}`}>
                                <label>Description</label>
                                <textarea type="text" placeholder="Write something about this campus" rows="3" name="description" onChange={handleInputChange} ></textarea>
                            </div>
                            <span className="input-error-msg">{fieldErrors.description}</span>
                        </div>
                    </form>
                </section>
                <footer className="org-form__footer">
                    <div className="flex">
                        <button className="discard" onClick={handleClose}>Discard</button>
                        <button className="next" onClick={handleSubmit}>Add</button>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default CampusForm;