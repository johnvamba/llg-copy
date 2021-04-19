import React, { useState, useEffect } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import FormTabInfo from './form-tab-info';
import FormTabInvite from './form-tab-invite';
import FormTabGoal from './form-tab-goal';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';
import LoadingScreen from '../../../components/LoadingScreen';
import ImageCropper from '../../../components/ImageCropper'

const GroupsForm = ({ data ={}, handleForm, afterSubmit }) => {
    const [countTab, setCountTab] = useState(1);
    const [activeTab, setActiveTab] = useState('category');
    const [fieldErrors, setFieldErrors] = useState({});
    const [goal, setGoal] = useState(1);
    const [term, setGoalType] = useState('month')
    const [campus, setCampus] = useState({})
    const [users, setUsers] = useState([]);
    const [fields, setFields] = useState({
        name: '',
        description: '',
        location: '',
        // address: '',
        privacy: '',
        photo: null,
        lat: null,
        lng: null
    });
    const [cropper, openCropper] = useState({
        url: null,
        cropTarget: 'banner'
    })
    const [submitting, setSubmitting] = useState(false)

    useEffect(()=>{
        if(data.id) {
            setFields({...fields, 
                name: data.name,
                description: data.description,
                location: data.location,
                // address: data.address,
                privacy: data.privacy,
                photo: data.photo,
                lat: data.lat,
                lng: data.lng
            })
            setCampus(data.campus || {})
            loadExtra()
        } else {
            setFields({
                name: '',
                description: '',
                location: '',
                // address: '',
                privacy: '',
                photo: null,
                lat: null,
                lng: null
            })
            setCampus({})
        }
        if(data.countTab)
            setCountTab(data.countTab)
    }, [data])

    const handleTab = (tab = 1) => {
        if(validateForm()) setCountTab(tab);
    }

    const fieldErrorMsg = {
        name: 'Missing Location Name',
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
        api.get(`/api/web/groups/${data.id}`)
        .then(()=>{
            
        })
    }

    const attemptSubmit = () => {
        if(validateForm()){
            setSubmitting(true)
            const params = {
                ...fields,
                users,
                campus,
                term,
                goal
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/groups`, params) : 
                api.patch(`/api/web/groups/${data.id}`, params)
            const data_id = data.id
            submitPromise.then(({data})=>{
                setSubmitting(false)
                handleForm({});
                swalSuccess(data_id ? "Group has been updated" : "Group added successfully")
                afterSubmit(data.data)
            }).catch(err=>{
                if(err.response){
                    const { data } = err.response
                    setFieldErrors(data.errors || [])
                }
                setSubmitting(false)
            })
        } else {
            swalError("Error occured on submit");
        }
    }

    const onChangePhoto = (file) => {
        const reader = new FileReader();
        const img = new Image();
        img.onload = () => {
            if(img.width < 300 || img.height < 300) {
                swalError("Image size is lower than 300")
                return;
            }
            openCropper({ url: img.src, cropTarget: 'photo' })
            setFieldErrors({...fieldErrors, photo : '' });
            setFields({...fields, photo: img.src})
        }
        reader.onload = (e2) => {
            img.src = e2.target.result
        }
        reader.readAsDataURL(file)
    }

    const closeCropper=()=>{
        openCropper({url: null, cropTarget: 'photo'})
    }

    return (
        <div className="group-form">
            {
                (submitting) &&
                <LoadingScreen title={
                    (submitting && (data.id ? 'Updating Group' : 'Creating Group')) ||
                    'Please wait'
                }/>
            }
            {
                cropper.url && <ImageCropper aspect={cropper.cropTarget == 'banner' ?  (14/5) : 1} originalImage={cropper.url} 
                    onImageCropped={(photo)=>setFields({...fields, photo})}
                    circle={ cropper.cropTarget == 'photo'}
                    closeCropper={closeCropper} />
            }
            {
                !data.id ? 
                <section className="group-header">
                    <button className="offers-create-form__close" type="button" disabled={submitting} onClick={()=>handleForm({})}>
                        <OffersFormCross />
                    </button>
                    <h2>Add Group</h2>
                    <div className="relative pt-1">
                        <div className="w-full bg-gray-400 rounded-full">
                            <div className={`bg-blue-400 rounded-full leading-none py-1 text-white tab-${countTab}`}></div>
                        </div>
                    </div>
                    <p>{countTab} of 3</p>
                </section> :
                <section className="group-header">
                    <button className="offers-create-form__close" type="button" disabled={submitting} onClick={()=>handleForm({})}>
                        <OffersFormCross />
                    </button>
                    <h2>Edit Group</h2>
                    <div className="offer-edit__opts">
                        <ul>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 1 ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab(1)}><h3>Group Information</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 2 ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab(2)}><h3>Invite People</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 3 ? 'offer-edit__opts-item--active' : '')} onClick={()=>handleTab(3)}><h3>Set your Group Goal</h3></li>
                        </ul>
                    </div>
                </section>

            }
            
            <section className="group-body">
                { countTab == 1 && 
                    <FormTabInfo
                        handleInputChange={handleInputChange}
                        handleLocation={handleLocation}
                        fieldErrors={fieldErrors}
                        fields={fields}
                        onChangePhoto={onChangePhoto}
                        handleSelectPrivacy={handleSelectPrivacy}
                        campus={campus}
                        setCampus={setCampus}
                        data={data}
                    />
                }
                { countTab == 2 && <FormTabInvite data={data} users={users} setUsers={setUsers} />}
                { countTab == 3 && <FormTabGoal goal={goal} setGoal={setGoal} goalType={term} setGoalType={setGoalType}/>}
            </section>

             <section className="group-footer">
                {
                    submitting ? 
                    <div className="offers-category-opt__container flex">
                        <button className="back" onClick={() => console.log('submitting')} disabled>Submitting</button>
                    </div> : 
                    <div className="offers-category-opt__container flex">
                        <button className="discard" onClick={()=>handleForm({}, true)} disabled={submitting} >Discard</button>
                        {
                            countTab > 1 &&
                            <button className="back" onClick={() => handleTab(countTab-1)} disabled={submitting} >Back</button>
                        }
                        {
                            (countTab !== 3) 
                            ? (<button className="next" onClick={()=>handleTab(countTab+1)} disabled={submitting} >Next</button>)
                            : (<button className="next" onClick={attemptSubmit} disabled={submitting} >{data.id ? 'Save' : 'Create'}</button>)
                        }
                    </div>
                }
            </section>
        </div>
    )
}

export default GroupsForm;