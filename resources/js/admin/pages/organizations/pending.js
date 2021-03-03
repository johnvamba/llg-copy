import React, { useState, useEffect } from 'react';
import Camera from '../../../svg/camera';
import OffersFormCross from '../../../svg/offers-form-cross';
import PencilIcon from '../../../svg/pencil';
import OffersPlus from '../../../svg/offers-plus';
import Circlet from '../../../svg/circlet'
import { usePopper } from 'react-popper';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';
import Button from '../../../components/Button';

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
const OrgInfo = ({ data={}, closePanel, handleEdit, handleInvite, afterSubmit }) => {
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

    const [approveElement, setApproveElement] = useState(null);
    const [rejectElement, setRejectElement] = useState(null);
    const [popped, setPopItem] = useState(false)
    const [popLoading, setPopLoading] = useState(false)
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [buttonElement, setButton] = useState(null)
    const [action, setAction] = useState('approve')

    const {styles, attributes} = usePopper(buttonElement, popperElement, {
        placement: 'top-start',
        className: 'arror',
        modifiers: [{name: 'arrow', options: {element: arrowElement } }],
    })


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

    const executeButton = (execute = false)=>{
        //do axios here based on settings
        if(execute){
            const text = action == 'approve' ? "You successfully approved an organisation" : "Archiving organisation"
            // return;
            setPopLoading(true)
            api.post(`/api/web/organizations/${data.id}/${action}`)
                .then(()=>{
                    swalSuccess(text);
                    afterSubmit();
                    closePanel()
                }).catch(()=>{
                    swalError()
                }).finally(()=>{
                    setPopLoading(false);
                })
        }
        //
        setPopItem(null)//close box
    }

    const togglePopItem = (item = false, button, type ='reject', clicked)=>{
        setAction(type)
        setPopItem(item)
        setButton(button)
    }

    return (
        <section className="org-view create-form flex flex-col">
            <header>
                <div className="flex items-center p-3 border-b-2 border-gray-300">
                    <i className="circlet mr-2"><Circlet /></i>
                    <h4 className="flex-grow">Pending Request</h4>
                    <button className="" onClick={()=>closePanel()}>
                        <i className="">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L13 13" stroke="#98999B" strokeWidth="1.5"/>
                                <path d="M13 1L1 13" stroke="#98999B" strokeWidth="1.5"/>
                            </svg>
                        </i>
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
            <section className="org-view__body flex-grow">
                <div className="org-view__members">
                    <label>Members {members_count ? `(${members_count})`: ''}</label>
                    <div className="org-view__members--container">
                        <ul>
                            {
                                members.length > 0 && members.map((i, k)=><MemberItem key={k} image={i.image}/>)
                            }
                        </ul>
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
            <footer className="flex justify-between bg-gray-200 p-3 relative">
                <h4>
                    Do you approve this organization?
                </h4>
                <div className="flex">
                    <button className="flex items-center rounded-full bg-green-400 mr-2 px-3 py-1 text-white" ref={setApproveElement} onClick={()=>togglePopItem(true, approveElement, 'approve')}>
                        <svg className="mr-1" width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7628 0H9.44142C9.15405 0 8.88076 0.138052 8.71172 0.374712L4.28279 6.51662L2.27681 3.73304C2.10776 3.4992 1.83729 3.35833 1.5471 3.35833H0.225748C0.0426177 3.35833 -0.0644431 3.56681 0.0426176 3.71613L3.55308 8.58458C3.63601 8.70033 3.74534 8.79464 3.87199 8.8597C3.99865 8.92477 4.13899 8.95871 4.28138 8.95871C4.42377 8.95871 4.56411 8.92477 4.69076 8.8597C4.81742 8.79464 4.92674 8.70033 5.00967 8.58458L10.9431 0.357809C11.053 0.208487 10.9459 0 10.7628 0Z" fill="white"/>
                        </svg>
                        Approve
                    </button>
                    <button className="flex items-center rounded-full bg-red-500 mr-2 px-3 py-1 text-white" ref={setRejectElement} onClick={()=>togglePopItem(true, rejectElement, 'reject')}>
                        <svg className="mr-1" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.85368 9.85363C8.65841 10.0489 8.34183 10.0489 8.14657 9.85363L0.353675 2.06074C0.158413 1.86547 0.158413 1.54889 0.353675 1.35363L1.06078 0.646522C1.25604 0.45126 1.57263 0.45126 1.76789 0.646522L9.56078 8.43941C9.75604 8.63468 9.75604 8.95126 9.56078 9.14652L8.85368 9.85363Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.06063 9.85363C1.25589 10.0489 1.57248 10.0489 1.76774 9.85363L9.56063 2.06074C9.75589 1.86547 9.75589 1.54889 9.56063 1.35363L8.85352 0.646522C8.65826 0.45126 8.34168 0.45126 8.14642 0.646522L0.353525 8.43941C0.158262 8.63468 0.158262 8.95126 0.353525 9.14652L1.06063 9.85363Z" fill="white"/>
                        </svg>
                        Decline
                    </button>
                </div>
                {
                    popped &&
                    <div ref={setPopperElement} 
                        className="action-content" 
                        style={{...styles.popper, top:'-45px', left: '0px', zIndex: 1, height: '100px'}} 
                        {...attributes.popper}>
                        <div ref={setArrowElement} 
                            className='action-arrow' 
                            style={{...styles.arrow}} />
                        {
                            popLoading ? <div className="button-container">
                                <p className="text-center mb-2">Loading...</p>
                            </div> : 
                            <div className="button-container">
                                {
                                    action == 'approve' ?
                                    <p className="text-center mb-2">Are you sure you want to approve this request?</p>
                                    : <p className="text-center mb-2 text-red-400">Are you sure you want to reject this request?</p>
                                }
                                <div className="flex justify-between">
                                    <Button onClick={()=>executeButton(false)}>
                                        No, Cancel
                                    </Button>
                                    <Button onClick={()=>executeButton(true)}>
                                        Yes
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                }
            </footer>
        </section>
    )
}

export default OrgInfo;