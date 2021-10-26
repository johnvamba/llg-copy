import React, { useEffect, useState } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Camera from '../../../svg/camera';
import Select from 'react-select';
import Location from '../../../components/Location'
import { swalError, swalSuccess } from '../../../components/helpers/alerts';
import { isValidated } from '../../../components/helpers/validator';
import LoadingScreen from '../../../components/LoadingScreen'
import BannerImage from '../../../components/BannerImage';
import ImageCropper from '../../../components/ImageCropper'
import { selectStylePaddingZero } from '../../../components/helpers/async_options';

const CampusForm = ({ data={}, handleForm, afterSubmit }) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
    })
    const [cropper, openCropper] = useState(false)

    const [cover, setCover] = useState(null)
    const [location, setLocation] = useState({
        location: '',
        lat: -37.8180604,
        lng: 145.0001764
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false);
    const [languange, setLanguage] = useState({});

    useEffect(()=>{
        const { name, description, location, lng, lat, photo } = data;
        // console.log('dataa', data)
        setCover(photo)
        setForm({name:name || '', description:description || ''})
        setLocation({ location, lat, lng })
    }, [data])

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({ ...form,
            [name]: value
        })
        removeError(name)
    }
    
    const handleLocation = ({formatted_address, geometry}) => {
        setLocation({
            location: formatted_address, 
            lat: geometry.location.lat(), 
            lng: geometry.location.lng()
        })
    }
    const handleImages = (file, cropper = false) => {
        // if(cropper)
        //     return
        const reader = new FileReader();
        reader.onload = (e2) => {
            openCropper(e2.target.result)
            // setCover( e2.target.result )
        }
        reader.readAsDataURL(file)
    }

    const validateSubmit = () => {
        const { name, description } = form
        const set = isValidated({
            name: name == '' ? "Missing campus name" : null,
            description: description == '' ? "Missing description" : null,
            location: location == '' ? "Missing location" : null,
        })
        setErrors({...set})
        return set;
    }
    const removeError= (name = '') => {
        delete errors[name]
        setErrors(errors)
    }
    const reset = ()=>{
        setForm({ name: '', description: ''})
        setLocation({
            location: '',
            lat: 0,
            lng: 0,
        })
        setCover('')
    }
    const submit = ()=>{
        const set = validateSubmit()
        if(_.isEmpty(set)){
            setSubmitting(true)
            const params = {
                ...form,
                ...location,
                photo: cover
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/campuses`, params) : 
                api.patch(`/api/web/campuses/${data.id}`, { ...params })
            const data_id = data.id;
            submitPromise.then(({data})=>{
                afterSubmit(data.data);
                swalSuccess(data_id ? "Organisation has been updated": 'New Organisation Created!')

                handleForm({}, false, false)
            }).catch(({response})=>{
                if(response){
                    setErrors(response.data)
                }
                swalError('Errors occured on server.')
            }).finally(()=>setSubmitting(false))
        } else {
            swalError('Fields are incorrect or missing')
        }
    }

    return(
        <section className="form campus-form create-form">
            {
                (submitting) &&
                <LoadingScreen title={
                    (submitting && (data.id ? 'Updating Location' : 'Creating Location')) ||
                    'Please wait'
                }/>
            }
            {
                cropper && <ImageCropper aspect={12/5} originalImage={cropper} 
                    onImageCropped={setCover}
                    closeCropper={()=>openCropper(null)} />
            }
            <header className="form-title create-story__header">
                <h3>{data.id ? 'Edit' : 'Add'} Location</h3>
                <button type="button" onClick={()=> handleForm(data, false, false)}>
                    <OffersFormCross />
                </button>
            </header>
            <section className="form-body campus-form__body">
                <BannerImage src={cover} height={'175px'} onChangeFile={handleImages}/>               
                <form>
                    <div className="w-full">
                        <div className={`form-group ${errors.name && 'form-error'}`}>
                            <label>Location Name</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Enter Location Name"
                                name="name"
                                value={form.name || ''}
                                onChange={handleInput}
                            />
                            {
                                (errors.name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing location name</span>
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <Location 
                            className={`form-group ${errors.location && 'form-error'}`}
                            name={'location'}
                            defaultValue={location.location || ''}
                            placesSelected={handleLocation}
                            errors={errors.location || []}/>
                    </div>
                    <div className="w-full">
                        <div className={`form-group form-group-textarea ${errors.description && 'form-error'}`}>
                            <label>Description</label>
                            <textarea type="text" placeholder="Write something about this location" rows="3"
                                value={form.description || ''}
                                name="description"
                                onChange={handleInput}
                            ></textarea>
                            {
                                (errors.description || false) && <span className="text-xs pt-1 text-red-500 italic">Missing description</span>
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="form-group">
                            <label>Select Languange</label>
                            <Select
                                styles={selectStylePaddingZero}
                                onChange={setLanguage}
                                options={[{label: "English (Default)", 'value': 'en'}]}
                            />
                        </div>
                    </div>
                </form>
            </section>
            <footer className="form-footer org-form__footer">
                <button className="discard" onClick={reset} disabled={submitting}>Discard</button>
                <button className="primary-btn" onClick={submit} disabled={submitting}>{submitting ? 'Submitting' : ( data.id ? 'Save' : 'Add' )} </button>
            </footer>
        </section>
    )
}

export default CampusForm;