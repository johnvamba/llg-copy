import React from 'react';

const FormBusinessInfo = ({service, updateBusiness, errors}) => {
	return(
        <section className="offers-service">
            <form className="w-full">
                <div className={`form-group ${errors.business_name && 'form-error'}`}>
                    <label>Name of Business</label>
                    <input className="input-field" type="text" value={service.business_name} onChange={({target})=>updateBusiness({...service, business_name: target.value})} placeholder="Enter Business Name" />
                    {
                        (errors.business_name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Business Name</span>
                    }
                </div>
                <div className={`form-group ${errors.business_site && 'form-error'}`}>
                    <label>Business Website (optional)</label>
                    <input className="input-field" type="text" value={service.business_site} onChange={({target})=>updateBusiness({...service, business_site: target.value})} placeholder="eg. sample@gmail.com" />
                    {
                        (errors.business_site || false) && <span className="text-xs pt-1 text-red-500 italic">Missing business website</span>
                    }
                </div>
                <div className={`form-group ${errors.business_contact && 'form-error'}`}>
                    <label>Contact Number</label>
                    <input className="input-field" type="text" value={service.business_contact} onChange={({target})=>updateBusiness({...service, business_contact: target.value})} placeholder="eg. (02) 9876 5432" />
                    {
                        (errors.business_contact || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Contact number</span>
                    }
                </div>
            </form>
        </section>
	)
}


export default FormBusinessInfo;