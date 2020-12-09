import React, { useState, useEffect } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import FormTabInfo from './form-tab-info';
import FormTabInvite from './form-tab-invite';
import FormTabGoal from './form-tab-goal';
import { swalError } from '../../../components/helpers/alerts';
import LoadingScreen from '../../../components/LoadingScreen';

const GroupsForm = ({ data ={}, handleForm, afterSubmit }) => {
    const [countTab, setCountTab] = useState(1);
    const [activeTab, setActiveTab] = useState('category');
    const [fieldErrors, setFieldErrors] = useState({});
    const [goal, setGoal] = useState(1);
    const [goalType, setGoalType] = useState('month')
    const [users, setUsers] = useState([]);
    const [fields, setFields] = useState({
        name: '',
        description: '',
        location: '',
        privacy: '',
        photo: null,
        lat: null,
        lng: null
    });
    const [submitting, setSubmitting] = useState(false)

    useEffect(()=>{
        if(data.id) {
            setFields({...fields, 
                name: data.name,
                description: data.description,
                location: data.location,
                privacy: data.privacy,
                photo: data.photo,
                lat: data.lat,
                lng: data.lng
            })
            loadExtra()
        }
    }, [data])

    const handleTab = (tab = 1) => {
        if(validateForm()) setCountTab(tab);
    }

    const fieldErrorMsg = {
        name: 'Missing Campus Name',
        description: 'Missing Description',
        location: 'Missing Location',
        photo: 'Missing photo',
        privacy: 'Need to Select a Privacy'
    }

    const handleInputChange = (e) => {
        setFieldErrors({...fieldErrors, [e.target.name] : '' });
        setFields({...fields, [e.target.name] : e.target.value });
    }

    const handleLocation = ({formatted_address, geometry}) => {
        setFields({
            ...fields,
            location: formatted_address, 
            lat: geometry.location.lat(), 
            lng: geometry.location.lng()
        })
        delete fieldErrors.location;
        setFieldErrors({...fieldErrors});
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

    const handleSelectPrivacy = (option) => {
        setFields({...fields, privacy : option});
    }

    const loadExtra = (cacheClear = false) => {

    }

    const attemptSubmit = () => {
        if(validateForm()){
            setSubmitting(true)
            const params = {
                ...fields,
                users,
                goal
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/groups`, params) : 
                api.patch(`/api/web/groups/${data.id}`, params)

            submitPromise.then(({data})=>{
                setSubmitting(false)
                handleForm({});
                afterSubmit(data.data)
            }).catch(err=>{
                if(err.response){
                    const { data } = err.response
                    setFieldErrors(data.errors || [])
                }
                setSubmitting(false)
            })
        } else {
            swalError();
        }
    }

    const onChangePhoto = (file) => {
        const reader = new FileReader();
        reader.onload = (e2) => {
            setFieldErrors({...fieldErrors, photo : '' });
            setFields({...fields, photo: e2.target.result})
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="offers-create-form">
            {
                (submitting) &&
                <LoadingScreen title={
                    (submitting && (data.id ? 'Updating Group' : 'Creating Group')) ||
                    'Please wait'
                }/>
            }
            <button className="offers-create-form__close" type="button" disabled={submitting} onClick={()=>handleForm({})}>
                <OffersFormCross />
            </button>
            {
                !data.id ? 
                <div className="offers-create-form__header">
                    <h2>Add Group</h2>
                    <div className="relative pt-1">
                        <div className="w-full bg-gray-400 rounded-full">
                            <div className={`bg-blue-400 rounded-full leading-none py-1 text-white tab-${countTab}`}></div>
                        </div>
                    </div>
                    <p>{countTab} of 3</p>
                </div> :
                <div className="offers-create-form__header">
                    <h2>Edit Group</h2>
                    <div className="offer-edit__opts">
                        <ul>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 1 ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab(1)}><h3>Group Information</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 2 ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab(2)}><h3>Invite People</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 3 ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab(3)}><h3>Set your Group Goal</h3></li>
                        </ul>
                    </div>
                </div>

            }
            
            <div className="offers-create-form__body">
                { countTab == 1 && 
                    <FormTabInfo
                        handleInputChange={handleInputChange}
                        handleLocation={handleLocation}
                        fieldErrors={fieldErrors}
                        fields={fields}
                        onChangePhoto={onChangePhoto}
                        handleSelectPrivacy={handleSelectPrivacy}
                        data={data}
                    />
                }
                { countTab == 2 && <FormTabInvite data={data} users={users} setUsers={setUsers} />}
                { countTab == 3 && <FormTabGoal goal={goal} setGoal={setGoal} goalType={goalType} setGoalType={setGoalType}/>}
            </div>

             <section className="offers-category-opt">
                {
                    submitting ? 
                    <div className="offers-category-opt__container flex">
                        <div>
                            <button className="back" onClick={() => console.log('submitting')} disabled>Submitting</button>
                        </div>
                    </div> : 
                    <div className="offers-category-opt__container flex">
                        <button className="discard" onClick={()=>handleForm({})} disabled={submitting} >Discard</button>
                        <div>
                            {
                                countTab > 1 &&
                                <button className="back" onClick={() => handleTab(countTab-1)} disabled={submitting} >Back</button>
                            }
                            {
                                (countTab !== 3) 
                                ? (<button className="next" onClick={()=>handleTab(countTab+1)} disabled={submitting} >Next</button>)
                                : (<button className="next" onClick={attemptSubmit} disabled={submitting} >{data.id ? 'Edit' : 'Create'}</button>)
                            }
                        </div>
                    </div>
                }
            </section>
        </div>
    )
}

export default GroupsForm;