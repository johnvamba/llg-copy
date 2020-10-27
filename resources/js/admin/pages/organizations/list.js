import React from 'react';

const OrgList = ({ setState }) => {
    return (
        <>
            <section className="org-list">
                <ul>
                    <li onClick={() => setState(true)}>
                        <header>
                            <div className="org-list__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                                <div className="org-list__rounded-img"></div>
                            </div>
                        </header>
                        <div className="org-list__body">
                            <h2>Organisation 01</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                        </div>
                        <footer className="org-list__footer">
                            <span className="active">2 Active Needs</span>
                            <span className="middle">.</span>
                            <span className="past">12 Past Needs</span>
                        </footer>
                    </li>
                    <li>
                        <header>
                            <div className="org-list__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                                <div className="org-list__rounded-img"></div>
                            </div>
                        </header>
                        <div className="org-list__body">
                            <h2>Organisation 02</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                        </div>
                        <footer className="org-list__footer">
                            <span className="active">2 Active Needs</span>
                            <span className="middle">.</span>
                            <span className="past">12 Past Needs</span>
                        </footer>
                    </li>
                    <li>
                        <header>
                            <div className="org-list__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                                <div className="org-list__rounded-img"></div>
                            </div>
                        </header>
                        <div className="org-list__body">
                            <h2>Organisation 03</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                        </div>
                        <footer className="org-list__footer">
                            <span className="active">2 Active Needs</span>
                            <span className="middle">.</span>
                            <span className="past">12 Past Needs</span>
                        </footer>
                    </li>
                    <li>
                        <header>
                            <div className="org-list__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                                <div className="org-list__rounded-img"></div>
                            </div>
                        </header>
                        <div className="org-list__body">
                            <h2>Organisation 04</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                        </div>
                        <footer className="org-list__footer">
                            <span className="active">2 Active Needs</span>
                            <span className="middle">.</span>
                            <span className="past">12 Past Needs</span>
                        </footer>
                    </li>
                    <li>
                        <header>
                            <div className="org-list__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                                <div className="org-list__rounded-img"></div>
                            </div>
                        </header>
                        <div className="org-list__body">
                            <h2>Organisation 05</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                        </div>
                        <footer className="org-list__footer">
                            <span className="active">2 Active Needs</span>
                            <span className="middle">.</span>
                            <span className="past">12 Past Needs</span>
                        </footer>
                    </li>
                </ul>
            </section>
        </>
    )
}
export default OrgList;