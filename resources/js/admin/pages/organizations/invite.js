import React from 'react';
import Attachment from '../../../svg/attachment';
import CrossPlain from '../../../svg/offers-plus';

const OrgInviteForm = ({ handleBackInvite }) => {
    return (
        <>
            <section className="org-view create-form">
                <section className="org-invite">
                    <header className="org-view-header">
                        <i onClick={handleBackInvite} className="fas fa-chevron-left"></i>
                        <img
                            className="rounded-full"
                            src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                        />
                        <label>Organisation 01</label>
                    </header>
                    <section className="org-invite__body">
                        <h2>Invite Members</h2>
                        <div className="org-invite__share">
                            <label>Share Link</label>
                            <div className="share__container">
                                <div>
                                    <Attachment />
                                    <span>neuma_jasndauh3SDqeslkdsl123lskdade219039</span>
                                </div>
                                <button>Copy</button>
                            </div>
                        </div>
                        <div className="org-invite__divider">
                            <span></span>
                            <span>or</span>
                            <span></span>
                        </div>
                        <form className="w-full flex flex-wrap">
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className="form-group form-input-text">
                                    <label>First Name</label>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Enter First Name"
                                    />
                                </div>
                                <div className="form-group form-input-text">
                                    <label>Email Address</label>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="eg. sample@email.com"
                                    />
                                </div>
                            </div>
                            <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                                <div className="form-group form-input-text">
                                    <label>Last Name</label>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                                <div className="form-group form-input-text">
                                    <label>Phone Number</label>
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="eg. (02) 9876 5432"
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="org-invite__add-person">
                            <button>
                                <CrossPlain />
                            </button>
                            <span>Add another person</span>
                        </div>
                    </section>
                    <footer className="org-invite__footer offers-edit-opt">
                        <div className="offers-edit-opt__container flex">
                            <button className="discard" onClick={handleBackInvite}>Discard</button>
                            <div>
                                <button className="next">Add</button>
                            </div>
                        </div>
                    </footer>
                </section>
            </section>
        </>
    )
}
export default OrgInviteForm;