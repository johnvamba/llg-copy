import React, { useState} from 'react';
import Attachment from '../../../svg/attachment';
import CrossPlain from '../../../svg/offers-plus';
import { validateEmail } from '../../../components/helpers/validator';

const OrgInviteForm = ({ data = {}, handleBackInvite }) => {
    const { name, image, inviteCode } = data
    const [errors, setErrors] = useState({});
    const [userSet, setUsers] = useState({});
    const [form, setForm ] = useState({
        firstname: '',
        lastname: '',
        email: '',
        contact: ''
    })

    const removeError= (name = '') => {
        delete errors[name]
        setErrors(errors)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({ ...form,
            [name]: value
        })
        removeError(name)
    }

    const validateSubmit = (form = form) => {
        const { firstname, lastname, email, contact } = form
        const set = {
            email: !validateEmail(email) ? "Missing email" : null,
            contact: contact == '' ? "Missing contact" : null,
            firstname: firstname == '' ? "Missing first name" : null,
            lastname: lastname == '' ? "Missing last name" : null
        }
        setErrors({...set})
        return set;
    }

    const onSubmit = ()=>{

    }

    return (
        <section className="org-view create-form">
            <section className="org-invite">
                <header className="org-view-header">
                    <i onClick={handleBackInvite} className="fas fa-chevron-left"></i>
                    <img
                        className="rounded-full"
                        src={image || `http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    />
                    <label>{name}</label>
                </header>
                <section className="org-invite__body">
                    <h2>Invite Members</h2>
                    <div className="org-invite__share">
                        <label>Share Link</label>
                        <div className="share__container">
                            <div>
                                <Attachment />
                                <span>{ inviteCode }</span>
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
                            <div className={`form-group ${errors.firstname ? 'form-error' : ''}`}>
                                <label>First Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="Enter First Name"
                                />
                                {
                                    (errors.firstname || false) && <span className="text-xs pt-1 text-red-500 italic">Missing email</span>
                                }
                            </div>
                            <div className={`form-group ${errors.email ? 'form-error' : ''}`}>
                                <label>Email Address</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="eg. sample@email.com"
                                />
                                {
                                    (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">Missing email</span>
                                }
                            </div>
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group ${errors.lastname ? 'form-error' : ''}`}>
                                <label>Last Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="Enter Last Name"
                                />
                                {
                                    (errors.lastname || false) && <span className="text-xs pt-1 text-red-500 italic">Missing email</span>
                                }
                            </div>
                            <div className={`form-group ${errors.contact ? 'form-error' : ''}`}>
                                <label>Phone Number</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="eg. (02) 9876 5432"
                                />
                                {
                                    (errors.contact || false) && <span className="text-xs pt-1 text-red-500 italic">Missing email</span>
                                }
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
    )
}
export default OrgInviteForm;