import React, { useState } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';


const ApiForm = ({ activeForm, handleCloseForm }) => {

    const [radioNeed, setRadioNeed] = useState('public');

    const handleRadioChange = e => {
        setRadioNeed(e.target.value);
    }

    return(
        <>
            <section className="api-form create-form">
                <header className="create-story__header">
                    <h2>{activeForm} API Key</h2>
                    <button type="button" onClick={() => handleCloseForm(false)}>
                        <OffersFormCross />
                    </button>
                </header>
                <section className="api-form__body">
                    <form>
                        <div className="w-full sm:w-full md:w-full">
                            <div className="form-group form-input-radio form-input-text">
                                <label>Select Type of Need</label>
                                <div className={`api-form__radio ${(radioNeed === 'public') ? 'active' : ''}`}>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="radio" className="form-radio cursor-pointer" name="radio" value="public" checked={radioNeed === 'public'} onChange={handleRadioChange} />
                                        <div className="details">
                                            <h3>Public Key</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</p>
                                        </div>
                                    </label>
                                </div>
                                <div className={`api-form__radio ${(radioNeed === 'secret') ? 'active' : ''}`}>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="radio" className="form-radio cursor-pointer" name="radio" value="secret" checked={radioNeed === 'secret'} onChange={handleRadioChange} />
                                        <div className="details">
                                            <h3>Secret Key</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-full md:w-full px-2">
                            <div className="form-group form-input-text">
                                <label>Name of the API Key</label>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Sample Name Here"
                                />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="org-form__footer">
                    <div className="flex">
                        <button className="discard" onClick={() => handleCloseForm(false)}>Discard</button>
                        <button className="next">Create</button>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default ApiForm;