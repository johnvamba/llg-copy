import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as NeedsActions from '../../../redux/needs/actions';
// import DataTable from '../../../components/layout/DataTable';
import Button from '../../../components/Button';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
import Circlet from '../../../svg/circlet'
import Pencil from '../../../svg/pencil'

//As test icon only
// import IconTest from '../../../svg/icon-test'

import './needs.css';

const NeedInfo = ({data, clickEdit, toClose}) => {
    const [loading, setLoading] = useState(false);
    const [ratio, setRatio] = useState(0);
    const [category, setCategory] = useState([]);
    const [photo, setPhoto] = useState('');
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
                ratio
            } = data.data
            // setTitle(title || '');
            setDescription(description || '');
            setCategory(category || []);
            setPhoto(photo || '');
            setRatio(ratio || 0);
            // setGoal(goal || 0);
            // setDate(date || new Date);
            // setTime(time || '');
            setLocation(location || {});
            // console.log('Something here', data);
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

    useEffect(()=>{
        if(data.id) {
            // console.log('called?', data);
            collectData(data.id)
        } else {
            // console.log('called here?', data);
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
            <div className="need-header">
            	<i className="circlet"><Circlet /></i>
            	<h4 className="need-status">{switchStatus()}</h4>
            	<button onClick={clickEdit}>
                    <i className="ml-1"><Pencil/></i>
                    Edit</button>
            </div>
            {
                (!loading) ? 
                <div className="need-content">
                	<div className="need-title">
    	            	<img className="need-img" src={photo} />
                        <h3>{data.title} <span>{data.date}</span> </h3>
    	            	<h5>{data.type || 'Donation'}</h5>
                	</div>
                    {
                        /*
                    	<div className="group-content">
                    		<label>Categories</label>
                    	</div>
                        */
                    }
                    <div className="group-content">
                        <div className="progress">
                            <div className="progress-bar" style={{width: `${ratio}%`}}></div>
                        </div>
                    </div>
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
                    {
                        /*
                    	<div className="group-content">
                    		<label>Location</label>
                    		<div className="need-map"></div>
                    	</div>
                        */
                    }
                    	<div className="group-content">
                        {
                            data.type == 'Volunteer' ? <label>Number of People Needed</label> : <label>Goal</label>
                        }
                    		<p>$ {data.goal}</p>
                    	</div>
                	<div className="group-content">
                        {
                            data.type == 'Volunteer' ? <label>What to bring</label> : <label>About</label>
                        }
                		<p>{description || 'Missing description'}</p>
                	</div>
                </div> : 
                <div className="need-content">
                    <div className="need-title mt-5">
                        <h3>{data.title} <span>{data.date}</span> </h3>
                        <h5>{data.type || 'Donation'}</h5>
                    </div>
                    <div className="need-title">
                        <p>Loading contents</p>
                    </div>
                </div>
            }
            <div className="need-footer">
                <Button className="flex text-white bg-blue-500 hover:bg-blue-600" 
                    onClick={()=>alert('something')}>
                    <Quill/>
                    Write a Story
                </Button>
            </div>
        </div>
    )
}

export default NeedInfo;