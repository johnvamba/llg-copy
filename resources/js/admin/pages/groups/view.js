import React, { useState, useEffect } from 'react';
import Camera from '../../../svg/camera';
import OffersFormCross from '../../../svg/offers-form-cross';
import PencilIcon from '../../../svg/pencil';
import OffersPlus from '../../../svg/offers-plus';

import TabMembers from '../organizations/tab-members';
import LoadingScreen from '../../../components/LoadingScreen'

const GroupInfo = ({ data={}, closePanel, handleForm}) => {
    const { name, description, active_needs, past_needs, members_count, banner, photo } = data
    const [ subData, setSubData ] = useState({
        org_link: '',
        org_contact: '',
        org_email: '',
    })
    const [members, setMembers ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMembers, setLoadingMembers] = useState(false);

    const loadItem = (clearCache = false) => {
        setLoading(true)
        // const token = axios.CancelToken.source();
        api.get(`/api/web/groups/${data.id}`, {
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            // cancelToken: token.token
        })
            .then(({data})=>{
                //other info here
            }).finally(() => setLoading(false))
        // return token;
    }

    const loadMembers = (clearCache = false) => {
        setLoadingMembers(true);
        // const token = axios.CancelToken.source();
        api.get(`/api/web/groups/${data.id}/members`, {
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            // cancelToken: token.token
        })
        .then(({data})=>{
            setMembers(data.data)
        }).finally(() => setLoadingMembers(false))
        // return token;
    }

    useEffect(()=>{
        if(data.id){
            const a = loadItem()
            const b = loadMembers()
            return ()=>{
                //cancel api here
                // a.cancel('Resetting');
                // b.cancel('Resetting');
            }
        } else {
            setSubData({
                org_link: '',
                org_contact: '',
                org_email: '',
            })
            setMembers([])
            setLoading(false)
            setLoadingMembers(false)
        }
    }, [data])
    const handleInvite = () => {
        data.countTab = 2;
        handleForm(data, true)
    }
    return (
        <section className="group-view">
            <header>
                <div className="group-top">
                    <img className="group-img" src={photo || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}/>
                    <div className="view-buttons">
                        <button className="edit-btn" onClick={()=>handleForm(data, true)}>
                            <i className="mr-2"><PencilIcon /></i>
                            Edit
                        </button>
                        <span className="ver-divider"></span>
                        <button className="" onClick={closePanel}>
                            <i className="">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13" stroke="#98999B" strokeWidth="1.5"/>
                                    <path d="M13 1L1 13" stroke="#98999B" strokeWidth="1.5"/>
                                </svg>
                            </i>
                        </button>
                    </div>
                </div>
                <div className='group-view-details'>
                    <h2>{ name }</h2>
                    <p>{description}</p>
                </div>
            </header>
            <section className="member-settings">
                <div className="member-cta">
                    <label>Members {members_count ? `(${members_count})`: ''}</label>
                    <div className="invite-button">
                        <button onClick={handleInvite}>
                            <i className="mr-2">
                                <OffersPlus />
                            </i>
                            Invite
                        </button>
                    </div>
                </div>
                <div className="member-list">
                    <TabMembers members={members} loading={loadingMembers}/>
                </div>
            </section>
        </section>
    )
}

export default GroupInfo;