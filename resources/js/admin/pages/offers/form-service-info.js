import React, { useEffect, useState } from 'react';
// import OffersLocation from '../../../svg/offers-location';
import Browse from '../../../svg/browse';
import Imagepond from '../../../components/Imagepond';
import Location from '../../../components/Location'

const FormServiceInfo = ({service, updateService, errors, fileList}) => {
    const handleLocation = ({formatted_address, geometry}) => {
        updateService({
            ...service,
            location: {
                location: formatted_address, 
                lat: geometry.location.lat(), 
                lng: geometry.location.lng()
            }})
    }
    const updatePhoto = (photo) => {
        updateService({...service, photo})
    }

	return(
        <section className="offers-service">
            <form className="w-full">
                <div className={`form-group ${errors.title && 'form-error'}`}>
                    <label>Title</label>
                    <input className="input-field" type="text" value={service.title || ''} onChange={(e)=>updateService({...service, title: e.target.value})} placeholder="Enter Title" />
                    {
                        (errors.title || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Title</span>
                    }
                </div>
                <div className={`form-group ${errors.desc && 'form-error'}`}>
                    <label>About</label>
                        <textarea rows="3" className="input-field" value={service.desc || ''} onChange={(e)=>updateService({...service, desc: e.target.value})} placeholder="Say something about this offer" />
                    {
                        // <input className="input-field" type="text" value={service.desc || ''} onChange={(e)=>updateService({...service, desc: e.target.value})} placeholder="Say something about this need" />
                    }
                    {
                        (errors.desc || false) && <span className="text-xs pt-1 text-red-500 italic">Missing About description</span>
                    }
                </div>
                {/*
                <div className={`form-group ${errors.address && 'form-error'}`}>
                    <label>Street Address</label>
                    <input className="input-field" type="text" value={service.address || ''} onChange={(e)=>updateService({...service, address: e.target.value})} placeholder="Enter Specific Address" />
                    {
                        (errors.address || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Street Address</span>
                    }
                </div>
                */}
                <Location 
                    className={`short-width ${errors.location && 'form-error'}`}
                    name={'location'}
                    defaultValue={service.location ? service.location.location : null}
                    placesSelected={handleLocation}
                    errors={errors.location || []}
                />
                <Imagepond photo={service.photo} imageSelected={updatePhoto} updatedFiles={(e)=>console.log('service info files', e)} errors={errors.photo}/>
            </form>
        </section>
	)
}


export default FormServiceInfo;