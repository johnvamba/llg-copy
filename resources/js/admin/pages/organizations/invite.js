import React, { useState} from 'react';
import Attachment from '../../../svg/attachment';
import CrossPlain from '../../../svg/offers-plus';
import { validateEmail, isValidated } from '../../../components/helpers/validator';
import { swalDiscard, swalSuccess, swalError } from '../../../components/helpers/alerts';
import { checkEmail } from '../../../components/helpers/async_options';
import LoadingScreen from '../../../components/LoadingScreen'

const List = ({data = {}}) => {
    const { firstname, lastname, email, contact } = data
    return <div className="w-full grid grid-cols-2 gap-x-4 mb-1">
        <div className={`form-group`}>
            <label>First Name</label>
            <input
                className="input-field"
                type="text"
                defaultValue={firstname}
                disabled
                placeholder="Enter First Name"
            />
        </div>
        <div className={`form-group`}>
            <label>Last Name</label>
            <input
                className="input-field"
                type="text"
                defaultValue={lastname}
                disabled
                placeholder="Enter Last Name"
            />
        </div>
        <div className={`form-group`}>
            <label>Email Address</label>
            <input
                className="input-field"
                type="text"
                defaultValue={email}
                disabled
                placeholder="eg. sample@email.com"
            />
        </div>
        <div className={`form-group`}>
            <label>Phone Number</label>
            <input
                className="input-field"
                type="text"
                defaultValue={contact}
                disabled
                placeholder="eg. (02) 9876 5432"
            />
        </div>
    </div>
}

const OrgInviteForm = ({ data = {}, handleBackInvite }) => {
    const { name, photo, inviteCode } = data
    const [errors, setErrors] = useState({});
    const [userSet, setUsers] = useState([]);
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        contact: ''
    })
    const [submitting, setSubmit] = useState(false);

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

    const validateSubmit = () => {
        const { firstname, lastname, email, contact } = form
        const set = isValidated({
            email: !validateEmail(email) ? "Missing email" : null
            // contact: contact == '' ? "Missing contact" : null,
            // firstname: firstname == '' ? "Missing first name" : null,
            // lastname: lastname == '' ? "Missing last name" : null
        })
        setErrors(set)
        return set;
    }

    const addPerson = () => {
        //run validator
        const set = validateSubmit()
        if(_.isEmpty(set)){
            //add to list of users to invite
            setUsers([...userSet, form]);
            setForm({
                firstname: '',
                lastname: '',
                email: '',
                contact: ''
            })
            setErrors({})
        }
    }

    const handleEmail = (e) => {
        const email = e.target.value
        setForm({ ...form, email })
        if(validateEmail(email)){
            removeError('email')
            // checkEmail(email, {type: 'user'})
            // .then(({data})=>{
            //     if(form.email == data.email){
            //         if(data.status == 'free')
            //             removeError('email')
            //         else
            //             setErrors({...errors, email: 'Email already existed'})                    
            //     }
            // })
        }
    }

    const handleDiscard = ()=>{
        swalDiscard.then(()=>{
            setForm({
                firstname: '',
                lastname: '',
                email: '',
                contact: ''
            })
            setUsers([]);
            setErrors({})
        })
    }

    const sendInvites = () => {
        let usr = {}

        if(validateEmail(form.email)){
            usr = {...form}
        }
        if(_.isEmpty(usr) && userSet.length == 0){
            swalError('Missing invite list!')
            return;
        }
        setSubmit(true)
        if(data.id){
            api.post(`/api/web/organizations/${data.id}/members`, {
                users: _.isEmpty(usr) ? userSet : [...userSet, usr]
            }).then(i=>{
                swalSuccess('Users invited');
                setSubmit(false)
                handleBackInvite();
            }).catch(i=>{
                setSubmit(false)
            })

        }
    }

    return (
        <section className="org-view create-form">
            {
                submitting && <LoadingScreen title="Sending invitations..."/>
            }
            <section className="org-invite">
                <header className="org-view-header">
                    <i onClick={handleBackInvite} className="fas fa-chevron-left"></i>
                    <img
                        className="rounded-full"
                        src={photo || `http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    />
                    <label>{name}</label>
                </header>
                <section className="org-invite__body">
                    <h2 className="mb-4">Invite Staff</h2>

                    {/* <div className="org-invite__share">
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
                    </div>*/}

                    <div className="w-full">
                        {
                            userSet.length > 0 && userSet.map(i => <List key={i.email} data={i}/> )
                        }
                        <div className="w-full grid grid-cols-2 gap-x-4 mb-1">
                            <div className={`form-group ${errors.firstname ? 'form-error' : ''}`}>
                                <label>First Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name='firstname'
                                    value={form.firstname}
                                    placeholder="Enter First Name"
                                    onChange={handleInput}
                                />
                                {
                                    (errors.firstname || false) && <span className="text-xs pt-1 text-red-500 italic">Missing first name</span>
                                }
                            </div>
                            <div className={`form-group ${errors.lastname ? 'form-error' : ''}`}>
                                <label>Last Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name='lastname'
                                    value={form.lastname}
                                    placeholder="Enter Last Name"
                                    onChange={handleInput}
                                />
                                {
                                    (errors.lastname || false) && <span className="text-xs pt-1 text-red-500 italic">Missing last name</span>
                                }
                            </div>
                            <div className={`form-group ${errors.email ? 'form-error' : ''}`}>
                                <label>Email Address</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="eg. sample@email.com"
                                    value={form.email}
                                    onChange={handleEmail}
                                />
                                {
                                    (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">{errors.email || 'Missing email'}</span>
                                }
                            </div>
                            <div className={`form-group ${errors.contact ? 'form-error' : ''}`}>
                                <label>Phone Number</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name='contact'
                                    value={form.contact}
                                    placeholder="eg. (02) 9876 5432"
                                    onChange={handleInput}
                                />
                                {
                                    (errors.contact || false) && <span className="text-xs pt-1 text-red-500 italic">Missing contact</span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="org-invite__add-person" onClick={addPerson}>
                        <button>
                            <CrossPlain />
                        </button>
                        <span>Add another person</span>
                    </div>
                </section>
                <footer className="org-invite__footer offers-edit-opt">
                    <div className="offers-edit-opt__container flex">
                        <button className="discard" onClick={handleDiscard}>Discard</button>
                        <div>
                            <button className="next" onClick={sendInvites}>Send Invitation</button>
                        </div>
                    </div>
                </footer>
            </section>
        </section>
    )
}
export default OrgInviteForm;