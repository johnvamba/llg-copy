import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as NeedsActions from '../../../redux/needs/actions';

// import DataTable from '../../../components/layout/DataTable';
import Button from '../../../components/Button';
import MapMini from '../../../components/helpers/map/index-mini';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
import Circlet from '../../../svg/circlet'
import Pencil from '../../../svg/pencil'

import { all } from './categorylist'
//As test icon only
// import IconTest from '../../../svg/icon-test'
import LoadingScreen from '../../../components/LoadingScreen'
import TabMembers from './tab-volunteers';

import './needs.css';

const NeedInfo = ({data, clickEdit, toClose, openStory}) => {
    const sampleSvg = all[0];
    const [loading, setLoading] = useState(false);
    const [ratio, setRatio] = useState(0);
    const [category, setCategory] = useState([]);
    const [photo, setPhoto] = useState('');
    const [tab, setTab] = useState('details');
    const [contributors, setContributors] = useState([])
    const [loadingContri, setLoadingContri] = useState(false)
    const [amounts, setAmounts] = useState({
        goal: 0,
        raised: 0
    })
    const [location, setLocation] = useState({
        formatted_address: '',
        lat: null,
        lng: null,
    })
    const [description, setDescription] = useState('');

    const collectData = (id) => {
        setLoading(true)
        // console.log('called?', data);
        api.get(`/api/web/needs/${id}`)
        .then(({data})=>{
            const { 
                description,
                photo,
                date,
                time,
                location,
                ratio,
                category,
                goal = 0,
                raised = 0,
            } = data.data
            // setTitle(title || '');
            setDescription(description || '');
            // console.log(all.filter(i => category.indexOf(i.name) >= 0), all,category)
            setCategory(all.filter(i => category.indexOf(i.name) >= 0));
            setPhoto(photo || '');
            setRatio(ratio || 0);
            setAmounts({ goal, raised })
            // setGoal(goal || 0);
            // setDate(date || new Date);
            // setTime(time || '');
            setLocation(location || {});
        })
        .catch(err => {
            // if(err.response){
            //     const { errors } = err.response
            //     setErrors(errors)
            // }
        }).then(()=>{
            setLoading(false)
        })
    }

    const collectContributors = () => {
        setLoadingContri(true)
        api.get(`/api/web/needs/${data.id}/contributors`)
            .then(({data})=>{
                setContributors(data.data);
                setLoadingContri(false)
            });
    }

    useEffect(()=>{
        if(data.id) {
            collectData(data.id)
            if(data.type == 'Volunteer'){
                collectContributors()
            }
        } else {
            const { ratio, description, bring, type, category, photo } = data || {}
            // setTitle(title || '');
            setDescription(description || '');
            setCategory(category || []);
            setPhoto(photo || null);

            setRatio(ratio || 0);
            // setGoal(goal || 0);
            // setDate(date || new Date);
            // setTime(time || '');
            setLocation(location || {});
        }
    }, [data])

    const switchStatus=()=>{
        switch(data.status){
            case 'achieved':
            return "Achieved";
            case 'on-going':
            return "On-Going";
            case 'pending':
            return "Pending";
            default:
            return "Unknown";
        }
    }

    if(!data)
    	return '';

    return (
        <div className="need-info">
            {
                (loading) &&
                <LoadingScreen title={
                    (loading && 'Loading need...') ||
                    'Please wait'
                }/>
            }
            <div className="need-header">
            	<i className="circlet"><Circlet /></i>
            	<h4 className="need-status">{switchStatus()}</h4>
            	<button className="contents" onClick={clickEdit}>
                    <i className="ml-1"><Pencil/></i>
                    Edit</button>
                <span className="ver-divider"></span>
                <button className="" onClick={toClose}>
                    <i className="ml-1">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13" stroke="#98999B" strokeWidth="1.5"/>
                            <path d="M13 1L1 13" stroke="#98999B" strokeWidth="1.5"/>
                        </svg>
                    </i>
                </button>
            </div>
            {
                (!loading) ? 
                <div className="need-content">
                	<div className="need-title">
                        {
                            photo ?
                                <img className="need-img" src={photo} />
                            : <div className="need-img-container"></div>
                        }
                        <h3>{data.title} <span>{data.date}</span> </h3>
    	            	<h5>{data.type || 'Donation'}</h5>
                	</div>
                    {
                        (data.type == 'Volunteer') ?
                        <div>
                            <div className="org-view__tabs offer-edit__opts mt-3">
                                <ul>
                                    <li className={"offer-edit__opts-item w-1/2 " + ((tab === 'details') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('details')}><h3>Details</h3></li>
                                    <li className={"offer-edit__opts-item w-1/2 " + ((tab === 'needs-volunteer') ? 'offer-edit__opts-item--active' : '')} onClick={()=>setTab('needs-volunteer')}><h3>Volunteer</h3></li>
                                </ul>
                            </div>
                            <div className="offers-create-form__body">
                                { (tab === 'details') && <div>
                                    {
                                        category.length > 0 &&
                                        <div className="group-content">
                                            <label>Categories</label>
                                            <div className="content-category">
                                            {
                                                category.map((i,ind)=> <span key={ind} className="category">
                                                        <i.svg_class active={true}/>
                                                        {i.name}
                                                    </span>
                                                )
                                            }
                                            </div>
                                        </div>
                                    }
                                    <div className="flex">
                                        <div className="group-content flex-1">
                                            <label>Date Needed</label>
                                            <p>{data.date || 'N/A'}</p>
                                        </div>
                                        <div className="group-content flex-1">
                                            <label>Time</label>
                                            <p>{data.time || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="group-content view-map">
                                        <label>Location</label>
                                        <div className="google-map">
                                            <MapMini lat={data.lat} lng={data.lng}/>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="group-content flex-1">
                                            <label>Number of People Needed</label> 
                                            <p>{data.goal || 0}</p>
                                        </div>
                                        <div className="group-content flex-1">
                                            <label>Current Volunteers</label> 
                                            <p>{amounts.raised || 0}</p>
                                        </div>
                                    </div>
                                    <div className="group-content">
                                        {
                                            data.type == 'Volunteer' ? <label>What to bring</label> : <label>About</label>
                                        }
                                        <p>{description || 'Missing description'}</p>
                                    </div>
                                </div>}
                                { (tab === 'needs-volunteer') && <TabMembers members={contributors} loading={loadingContri}/>}
                            </div>
                        </div> :
                        <div>
                            <div className="group-content">
                                <div className="progress">
                                    {/* <div className="progress-bar" style={{width: `${ratio}%`}}></div> */}
                                    <div className="w-full bg-gray-400 rounded-full">
                                        <div className={`bg-blue-400 rounded-full leading-none py-1 text-white bar`} style={{width: `${ratio}%`}}></div>
                                    </div>
                                </div>
                                <div className="money flex items-center justify-between pt-2">
                                    <span>Raised: ${parseFloat(amounts.raised || 0).toFixed(2)}</span>
                                    <span>Goal: ${parseFloat(amounts.goal || 0).toFixed(2)}</span>                            
                                </div>
                            </div>
                            {
                                category.length > 0 &&
                                <div className="group-content">
                                    <label>Categories</label>
                                    <div className="content-category">
                                    {
                                        category.map((i,ind)=> <span key={ind} className="category">
                                                <i.svg_class active={true}/>
                                                {i.name}
                                            </span>
                                        )
                                    }
                                    </div>
                                </div>
                            }
                            <div className="group-content">
                                {
                                    data.type == 'Volunteer' ? <label>What to bring</label> : <label>About</label>
                                }
                                <p>{description || 'Missing description'}</p>
                            </div>
                        </div>
                    }

                </div> : 
                <div className="need-content">
                    <div className="need-title">
                        <p>Loading contents</p>
                    </div>
                </div>
            }
            {
                (switchStatus() == 'Achieved' && (ratio >= 100)) &&
                    <div className="need-footer">
                        <Button className="primary-btn flex items-center" 
                            onClick={openStory}>
                            <Quill/>
                            Write a Story
                        </Button>
                    </div>
            }
        </div>
    )
}

export default NeedInfo;