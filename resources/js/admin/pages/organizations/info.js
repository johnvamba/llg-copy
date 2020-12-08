import React, { useState, useEffect } from 'react';
import Camera from '../../../svg/camera';
import OffersFormCross from '../../../svg/offers-form-cross';
import PencilIcon from '../../../svg/pencil';
import OffersPlus from '../../../svg/offers-plus';

import TabMembers from './tab-members';
import TabActiveNeeds from './tab-active-needs';
import LoadingScreen from '../../../components/LoadingScreen'

const MemberItem = ({image = null}) => {
    return <li>
        <img
        className="rounded-full"
        src={`${image || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}`}
        />
    </li>
}
const OrgInfo = ({ data={}, closePanel, handleEdit, handleInvite }) => {
    const { name, description, active_needs, past_needs, members_count, banner, photo } = data
    const [ subData, setSubData ] = useState({
        org_link: '',
        org_contact: '',
        org_email: '',
    })
    const [members, setMembers ] = useState([]);
    const [actives, setActives ] = useState({
        data: [],
        meta: {}
    });
    const [pasts, setPasts ] = useState({
        data: [],
        meta: {}
    });
    const [tab, setTab] = useState('active-needs');
    const [loading, setLoading] = useState(false);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [loadingNeedActives, setLoadingNeedActives] = useState(false);
    const [loadingNeedPasts, setLoadingNeedPasts] = useState(false);

    const loadItem = (clearCache = false) => {
        setLoading(true)
        // const token = axios.CancelToken.source();
        api.get(`/api/web/organizations/${data.id}`, {
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
        api.get(`/api/web/organizations/${data.id}/members`, {
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

    const loadNeedActives = (clearCache = false) => {
        setLoadingNeedActives(true)
        // const token = axios.CancelToken.source();
        api.get(`/api/web/organizations/${data.id}/needs`, {
            params: {
                status: 'current'
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            // cancelToken: token.token
        })
            .then(({data})=>{
                setActives({
                    data: [...actives.data, ...data.data],
                    page: {...data.meta}
                })
            }).finally(() => setLoadingNeedActives(false))
        // return token;
    }

    const loadNeedPasts = (clearCache = false) => {
        setLoadingNeedPasts(true)
         // const token = axios.CancelToken.source();
        api.get(`/api/web/organizations/${data.id}/needs`, {
            params: {
                status: 'past'
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            // cancelToken: token.token
        })
            .then(({data})=>{
                setPasts({
                    data: [...pasts.data, ...data.data],
                    page: {...data.meta}
                })
            }).finally(() => setLoadingNeedPasts(false))
        // return token;       
    }

    useEffect(()=>{
        if(data.id){
            const a = loadItem()
            const b = loadMembers()
            const c = loadNeedPasts()
            const d = loadNeedActives()
            return ()=>{
                //cancel api here
                // a.cancel('Resetting');
                // b.cancel('Resetting');
                // c.cancel('Resetting');
                // d.cancel('Resetting');
            }
        } else {
            setSubData({
                org_link: '',
                org_contact: '',
                org_email: '',
            })
            setMembers([])
            setActives({
                data: [],
                meta: {}
            })
            setPasts({
                data: [],
                meta: {}
            })
            setTab('active-needs')
            setLoading(false)
            setLoadingMembers(false)
            setLoadingNeedActives(false)
            setLoadingNeedPasts(false)
        }
    }, [data])

    return (
        <section className="org-view create-form">
            <header>
                <div className="org-form__cover-bg bg-cover bg-center"  style={{backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}>
                    <button className="org-form__close" onClick={() => closePanel({})}>
                        <OffersFormCross />
                    </button>
                    <div className="org-form__rounded-img" style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}></div>
                </div>
                <div className="org-view__edit">
                    <button onClick={handleEdit}>
                        <PencilIcon />
                        Edit
                    </button>
                </div>
                <div className='org-view__details'>
                    <h2>{ name }</h2>
                    {
                        subData.org_link &&
                        <div className="org-view__info-with-icon">
                            <i className="fas fa-globe text-gray-400"></i>
                            <label>{subData.org_link || ''}</label>
                        </div>
                    }
                    {
                        (subData.org_contact || subData.org_email) && 
                        <div className="org-view__info-with-icon--two">
                            <div className="org-view__info-with-icon">
                                <i className="fas fa-phone-alt text-gray-400"></i>
                                <label>{subData.org_contact || ''}</label>
                            </div>
                            <div className="org-view__info-with-icon">
                                <i className="fas fa-envelope text-gray-400"></i>
                                <label>{subData.org_email || ''}</label>
                            </div>
                        </div>
                    }
                    <p>{description}</p>
                </div>
            </header>
            <section className="org-view__body">
                <div className="org-view__members">
                    <label>Members {members_count ? `(${members_count})`: ''}</label>
                    <div className="org-view__members--container">
                        <ul>
                            {
                                members.length > 0 && members.map((i, k)=><MemberItem key={k} image={i.image}/>)
                            }
                        </ul>
                        <button onClick={handleInvite}>
                            <OffersPlus />
                            Invite
                        </button>
                    </div>
                </div>
                <div className="org-view__tabs offer-edit__opts">
                    <ul>
                        <li className={"offer-edit__opts-item w-1/3 " + ((tab === 'members') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('members')}><h3>Organisation Members ({ members_count || 0 })</h3></li>
                        <li className={"offer-edit__opts-item w-1/3 " + ((tab === 'active-needs') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('active-needs')}><h3>Active Needs ({ active_needs || 0 })</h3></li>
                        <li className={"offer-edit__opts-item w-1/3 " + ((tab === 'past-needs') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('past-needs')}><h3>Past Needs ({ past_needs || 0 })</h3></li>
                    </ul>
                </div>
                <div className="offers-create-form__body">
                    { (tab === 'members') && <TabMembers members={members} loading={loadingMembers}/>}
                    { (tab === 'active-needs') && <TabActiveNeeds needs={actives.data} loading={loadingNeedActives}/>}
                    { (tab === 'past-needs') && <TabActiveNeeds needs={pasts.data} loading={loadingNeedPasts}/>}
                </div>
            </section>
        </section>
    )
}

export default OrgInfo;