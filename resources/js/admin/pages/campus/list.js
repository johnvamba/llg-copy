import React from 'react';
import CampusIcon from '../../../svg/campus';

import './campus.css';

const CampusList = ({ setShowView }) => {
    return(
        <>
            <section className="campus-list">
                <ul className="flex items-center flex-wrap">
                    <li onClick={() => setShowView(true)}>
                        <header>
                            <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}} />
                        </header>
                        <section className="campus-list__body">
                            <h2>Melbourne City</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="flex items-center">
                                <CampusIcon />
                                <label>14 Organisations</label>
                            </div>
                        </section>
                    </li>
                    <li onClick={() => setShowView(true)}>
                        <header>
                            <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}} />
                        </header>
                        <section className="campus-list__body">
                            <h2>Melbourne City</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="flex items-center">
                                <CampusIcon />
                                <label>14 Organisations</label>
                            </div>
                        </section>
                    </li>
                    <li onClick={() => setShowView(true)}>
                        <header>
                            <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}} />
                        </header>
                        <section className="campus-list__body">
                            <h2>Melbourne City</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="flex items-center">
                                <CampusIcon />
                                <label>14 Organisations</label>
                            </div>
                        </section>
                    </li>
                    <li onClick={() => setShowView(true)}>
                        <header>
                            <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}} />
                        </header>
                        <section className="campus-list__body">
                            <h2>Melbourne City</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="flex items-center">
                                <CampusIcon />
                                <label>14 Organisations</label>
                            </div>
                        </section>
                    </li>
                    <li onClick={() => setShowView(true)}>
                        <header>
                            <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}} />
                        </header>
                        <section className="campus-list__body">
                            <h2>Melbourne City</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="flex items-center">
                                <CampusIcon />
                                <label>14 Organisations</label>
                            </div>
                        </section>
                    </li>
                    <li onClick={() => setShowView(true)}>
                        <header>
                            <div className="flex bg-cover bg-center" style={{backgroundImage: "url()"}} />
                        </header>
                        <section className="campus-list__body">
                            <h2>Melbourne City</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="flex items-center">
                                <CampusIcon />
                                <label>14 Organisations</label>
                            </div>
                        </section>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default CampusList;