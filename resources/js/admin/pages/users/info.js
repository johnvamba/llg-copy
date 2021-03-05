import React, { useState, useEffect } from 'react';
import Camera from '../../../svg/camera';
import OffersFormCross from '../../../svg/offers-form-cross';
import PencilIcon from '../../../svg/pencil';
import OffersPlus from '../../../svg/offers-plus';
import LoadingScreen from '../../../components/LoadingScreen'

const UserInfo = ({ data={}, showItem}) => {
    const { title, bio, email, photo, mobile_number } = data
    const [loading, setLoading] = useState({
        user: false,
        group: false,
        mets: false
    });
    const [groups, setGroups] = useState([]);
    const [needs, setNeeds] = useState([]);

    const updateLoading = (load = 'user', state=false) => setLoading({...loading, [load] : state});

    const loadUser = (clearCache = false) => {
        updateLoading('user', true)
        api.get(`/api/web/users/${data.id}`, {
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            // cancelToken: token.token
        })
            .then(({data})=>{
                //other info here
                updateLoading('user')
            }).finally(() =>console.log('check'))
        // return token;
    }

    const loadGroups = () => {
        updateLoading('group', true)
        setGroups([]);
        api.get(`/api/web/users/${data.id}/groups`)
        .then(({data})=> {
            setGroups(data.data);
            updateLoading('group')
        })
    }

    const loadMets = () => {
        updateLoading('mets', true)
        setNeeds([])
        api.get(`/api/web/users/${data.id}/needs`)
        .then(({data})=> {
            setNeeds(data.data);
            updateLoading('mets')
        })
    }

    useEffect(()=>{
        if(data.id){
            const a = loadUser()
            loadGroups()
            loadMets()
            return ()=>{

            }
        } else {
            setLoading(false)
            setLoadingNeeds(false)
        }
    }, [data])

    if(loading.user) 
        <section className="user-view">
            <LoadingScreen title="Loading user details"/>
        </section>

    return (
        <section className="user-view">
            <header>
                <div className="user-top">
                    <img className="user-img" src={photo || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}/>
                    <div className="view-buttons">
                        <button className="edit-btn" onClick={()=>showItem(data, true)}>
                            <i className="mr-2"><PencilIcon /></i>
                            Edit
                        </button>
                        <span className="ver-divider"></span>
                        <button className="" onClick={()=>showItem()}>
                            <i className="">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13" stroke="#98999B" strokeWidth="1.5"/>
                                    <path d="M13 1L1 13" stroke="#98999B" strokeWidth="1.5"/>
                                </svg>
                            </i>
                        </button>
                    </div>
                </div>
                <div className='user-view-details'>
                    <h2>{ title }, {data.age || '18'}</h2>
                    <div className="user-contacts my-2">
                        {
                            mobile_number && 
                            <div className="user-phone mr-3">
                                <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3419 10.0764L11.4258 8.16036C10.7415 7.47606 9.57818 7.74981 9.30446 8.63938C9.09917 9.25528 8.41486 9.59744 7.79899 9.46055C6.43037 9.11839 4.58274 7.3392 4.24059 5.90215C4.0353 5.28625 4.44588 4.60194 5.06176 4.39667C5.95136 4.12295 6.22508 2.95963 5.54077 2.27532L3.62471 0.359261C3.07727 -0.119754 2.2561 -0.119754 1.77708 0.359261L0.476899 1.65945C-0.823285 3.02806 0.61376 6.65489 3.83 9.87113C7.04625 13.0874 10.6731 14.5929 12.0417 13.2242L13.3419 11.9241C13.8209 11.3766 13.8209 10.5554 13.3419 10.0764Z" fill="#CF995F"/>
                                </svg>
                                { mobile_number }
                            </div>
                        }
                        {
                            email &&
                            <div className="user-email mr-3">
                                <svg className="mr-2" width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5496 0H0.650024L9.09986 6.96006L17.6452 0.0194996C17.6139 0.0103592 17.582 0.0038466 17.5496 0Z" fill="#CF995F"/>
                                <path d="M9.50993 8.30443C9.27045 8.50053 8.9259 8.50053 8.68642 8.30443L0 1.14809V12.3499C0 12.7089 0.291008 12.9999 0.649999 12.9999H17.5496C17.9086 12.9999 18.1996 12.7089 18.1996 12.3499V1.24429L9.50993 8.30443Z" fill="#CF995F"/>
                                </svg>
                                {email}
                            </div>
                        }
                    </div>
                    <p>{ bio }</p>
                </div>
            </header>

            {
                groups.length > 0 &&
                <section className="panel group-list">
                    <label>Group</label>
                    {
                        groups.map((i,ind) =>
                        <div key={'group_'+i.ind} className="group-item">
                            <img className="group-img" src={i.photo || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}/>
                            <div className="group-details">
                                <h4>{i.name}</h4>
                                <p className="capitalize">{i.privacy || 'Public'} GROUP<span/>{i.participants_count || 0} MEMBERS</p>
                            </div>
                        </div>)
                    }
                </section>
            }
            {
                needs.length > 0 && 
                <section className="panel needs-met">
                    <label>Needs Met</label>
                    <div className="needs-list">
                        {
                            needs.map((i, ind) => 
                            <div key={'needs_'+i.ind} className="need-item">
                                <img className="need-img" src={i.photo || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}/>
                                <div className="need-detail">
                                    <div className="need-title">
                                        <h3>{i.title}</h3>
                                        <span>{i.type || 'Donation'}</span>
                                    </div>
                                    <p className="need-description">{i.description || ''}</p>
                                    <p className="need-inform">{i.contri_date || 'Recently'} 
                                        <span>{i.type != 'Volunteer' && '$'}{i.contri_amount || 0.00}</span>
                                    </p>
                                    <div className="bar-status">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: `${i.ratio || 0}%`}}></div>
                                        </div>
                                        <span className="percent">{i.ratio || 0}%</span>
                                    </div>
                                    <div className="need-status">
                                        <p>{i.type != 'Volunteer' ? 'Raised: $' : 'Volunteered: '}{i.raised || 0.00}</p>
                                        <p>Goal: {i.type != 'Volunteer' && '$'}{i.goal || 0.00}</p>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </section>
            }
        </section>
    )
}

export default UserInfo;