import React, { useEffect, useState } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Camera from '../../../svg/camera';

import Location from '../../../components/Location'
import { swalError } from '../../../components/helpers/alerts';


const CampusForm = ({ data={}, handleForm, afterSubmit }) => {
    const [form, setForm] = useState({
        name: '',
        description: ''
    })
    const [cover, setCover] = useState('')
    const [location, setLocation] = useState({
        location: '',
        lat: 0,
        lng: 0,
    })
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        const {name, description}= data;
        setForm({name:name || '', description:description || ''})
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

    const validateSubmit = () => {
        const { name, description } = form
        const set = {
            name: name == '' ? "Missing campus name" : null,
            description: description == '' ? "Missing description" : null,
            location: location == '' ? "Missing location" : null,
        }
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
            const params = {
                ...form,
                ...location,
                photo: cover
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/campuses`, params) : 
                api.update(`/api/web/campuses/${data.id}`, { params })

            submitPromise.then(({data})=>{
                afterSubmit(data.data);
                handleForm({}, false, false)
            }).catch(({response})=>{
                if(response){
                    setErrors(response.data)
                }
                swalError('Errors occured on server.')
            })
        } else {
            swalError('Fields are incorrect or missing')
        }
    }

    return(
        <section className="campus-form create-form">
            <header className="create-story__header">
                <h2>{data.id ? 'Edit' : 'Add'} Campus</h2>
                <button type="button" onClick={()=> handleForm(data, false, false)}>
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
                        <div className={`form-group ${errors.name && 'form-error'}`}>
                            <label>Campus Name</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Enter Campus Name"
                                name="name"
                                value={form.name || ''}
                                onChange={handleInput}
                            />
                            {
                                (errors.name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing campus name</span>
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <Location 
                            className={`form-group ${errors.location && 'form-error'}`}
                            name={'location'}
                            placesSelected={handleLocation}
                            errors={errors.location || []}/>
                    </div>
                    <div className="w-full">
                        <div className={`form-group form-group-textarea ${errors.description && 'form-error'}`}>
                            <label>Description</label>
                            <textarea type="text" placeholder="Write something about this campus" rows="3"
                                value={form.description || ''}
                                name="description"
                                onChange={handleInput}
                            ></textarea>
                            {
                                (errors.description || false) && <span className="text-xs pt-1 text-red-500 italic">Missing description</span>
                            }
                        </div>
                    </div>
                </form>
            </section>
            <footer className="org-form__footer">
                <div className="flex">
                    <button className="discard" onClick={reset}>Discard</button>
                    <button className="next" onClick={submit}>{data.id ? 'Edit' : 'Add'} </button>
                </div>
            </footer>
        </section>
    )
}

export default CampusForm;