import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button'
import { NavLink } from 'react-router-dom';
import { swalSuccess, swalDelete, swalError } from '../../../components/helpers/alerts';
import CrossPlain from '../../../svg/cross-plain'
//As test icon only
import LoadingScreen from '../../../components/LoadingScreen'

const ReportForm = ({data = {}, handleForm}) => {

    const [submitting, setSubmitting] = useState(false);
    const [thumbs, setThumb] = useState('neutral');
    const [comment, setReport] = useState('');
    const [errors, setErrors] = useState({});

    const submit = () => {
        setSubmitting(true)
        api.post(`/api/web/offers/${data.id}/reports`, {
            thumbs, comment
        }).then(({data})=>{
            swalSuccess('Report submitted!');
            handleForm({}, false);
            // setLoading(null);
        }).finally(()=>{
            setSubmitting(false)
        })
    }

    const clearContent = () => {
        setThumb('neutral')
        setReport('')
    }

    return (
       <div className="form need-form">
            {
                (submitting) &&
                <LoadingScreen title={'Posting Report'}/>
            }
            <div className="form-title">
                <h3>Report Use</h3>
                <button type="button" onClick={()=>handleForm({}, false)}>
                    <CrossPlain />
                </button>
            </div>
            <div className="form-body">
                <div className="form-group">
                    <label>Select Reaction</label>
                    <div className="button-group">
                    <Button className={thumbs=='up' ? 'active': ''} onClick={()=>setThumb('up')}>Thumbs Up</Button>
                    <Button className={thumbs=='down' ? 'active': ''} onClick={()=>setThumb('down')}>Thumbs Down</Button>
                    </div>
                </div>
                
                <div className={`form-group w-full ${errors.comment && 'form-error'}`}>
                    <label>Report Message</label>
                    <textarea rows="3" className="input-field" placeholder="Enter Information" value={comment} onChange={e=>setReport(e.target.value)}/>
                    {
                        (errors.comment || false) && <span className="text-xs pt-1 text-red-500 italic">Missing message</span>
                    }
                </div>
            </div>
            <div className="form-footer">
                <Button className="btn btn-secondary" onClick={clearContent} disabled={submitting}>Discard</Button>
                <Button className="btn primary-btn" onClick={submit} disabled={submitting}>Submit</Button>
            </div>
        </div>
    )
}

export default ReportForm;