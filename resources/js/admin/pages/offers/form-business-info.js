import React from 'react';

const FormBusinessInfo = ({service, updateBusiness, errors}) => {
	return(
        <section className="offers-service">
            <form className="w-full">
                <div className={`form-group ${errors.busName && 'form-error'}`}>
                    <label>Name of Business</label>
                    <input className="input-field" type="text" value={service.busName} onChange={({target})=>updateBusiness({...service, busName: target.value})} placeholder="Enter Business Name" />
                    {
                        (errors.busName || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Business Name</span>
                    }
                </div>
                <div className={`form-group ${errors.busSite && 'form-error'}`}>
                    <label>Business Website (optional)</label>
                    <input className="input-field" type="text" value={service.busSite} onChange={({target})=>updateBusiness({...service, busSite: target.value})} placeholder="eg. sample@gmail.com" />
                    {
                        (errors.busSite || false) && <span className="text-xs pt-1 text-red-500 italic">Missing business website</span>
                    }
                </div>
                <div className={`form-group ${errors.busContact && 'form-error'}`}>
                    <label>Contact Number</label>
                    <input className="input-field" type="text" value={service.busContact} onChange={({target})=>updateBusiness({...service, busContact: target.value})} placeholder="eg. (02) 9876 5432" />
                    {
                        (errors.busContact || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Contact number</span>
                    }
                </div>
            </form>
        </section>
	)
}


export default FormBusinessInfo;