import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Tooltip } from 'reactstrap';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';
import Attachment from '../../../svg/attachment';
import { swalSuccess } from '../../../components/helpers/alerts';

const StripeKey = () => {
    const [show, setShow] = useState({
        secret: false,
        publish: false
    });
    const [loaded, setLoad] = useState(false);
    const [secretKey, setKey] = useState('');
    const [publishKey, setPubKey] = useState('');

    useEffect(()=>{
        if(!loaded) {
            api.get('/api/web/organizations/credentials')
            .then(({data}) => {
                const { secret_key, publishable_key } = data
                if(secret_key || publishable_key) {
                    setKey(secret_key ?? '')
                    setPubKey(publishable_key ?? '')
                } else {
                    setShow({
                        secret: true,
                        publish: true
                    })
                }
            }).catch(()=>{

            });
        }
    }, [loaded])

    const submit = () => {
        api.post('/api/web/organizations/credentials', {
            secret_key: secretKey,
            publishable_key: publishKey
        })
        .then(()=>{
            swalSuccess('Stripe Credentials updated')
        }).catch(()=>{

        })
    }

    const clickEye = (showEye = 'secret') => {
        setShow({...show, [showEye]: !show[showEye]})
    }

    return(
        <div className="stripe-container">
            <header className="flex items-center justify-between  mb-2">
                <h2 className="title">Organization Stripe Key</h2>
            </header>
            <section className="form-container mb-4">
                <div className="form-group">
                    <label>Secret Key</label>
                    <div className="flex items-center justify-between relative">
                        <input className="w-full border-0 bg-gray-200 px-3 py-2 rounded-sm" 
                        type={show.secret ? 'text' : 'password'} value={secretKey} onChange={(e)=>setKey(e.target.value)}/>
                        {
                            show.secret ? <i className="absolute right-0 mr-2 fa fa-eye-slash text-gray-500" aria-hidden="true" onClick={()=>clickEye('secret')}></i>
                            : <i className="absolute right-0 mr-2 fa fa-eye text-gray-600" aria-hidden="true" onClick={()=>clickEye('secret')}></i>
                        }
                    </div>
                </div>
                <div className="form-group">
                    <label>Publishable Key</label>
                    <div className="flex items-center justify-between relative">
                    <input className="w-full border-0 bg-gray-200 px-3 py-2" 
                    type={show.publish ? 'text' : 'password'} value={publishKey} onChange={(e)=>setPubKey(e.target.value)}/>
                    {
                        show.publish ? <i className="absolute right-0 mr-2 fa fa-eye-slash text-gray-500" aria-hidden="true" onClick={()=>clickEye('publish')}></i>
                        : <i className="absolute right-0 mr-2 fa fa-eye text-gray-600" aria-hidden="true" onClick={()=>clickEye('publish')}></i>
                    }
                    </div>
                </div>
            </section>
            <section className="flex justify-end">
                <button className="btn primary-btn" onClick={submit}>Save</button>
            </section>
        </div>
    )
}

export default StripeKey;
