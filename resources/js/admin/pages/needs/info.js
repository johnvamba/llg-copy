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
    if(!data)
    	return '';

    return (
        <div className="need-info">
            <div className="need-header">
            	<i className="circlet"><Circlet /></i>
            	<h4 className="need-status">On-Going</h4>
            	<button onClick={clickEdit}>
                    <i className="ml-1"><Pencil/></i>
                    Edit</button>
            </div>
            <div className="need-content">
            	<div className="need-title">
	            	<img className="need-img" />
                    <h3>Title <span>08/27/20</span> </h3>
	            	<h5>Volunteer</h5>
            	</div>
            	<div className="group-content">
            		<label>Categories</label>
            	</div>
                <div className="group-content">
                    <div className="progress-bar">
                        <div className="progress" style={{width: "85%"}}></div>
                    </div>
                </div>
                <div className="flex">
                	<div className="group-content flex-1">
                		<label>Date Needed</label>
                        <p>Sept 01, 2020</p>
                	</div>
                	<div className="group-content flex-1">
                		<label>Time</label>
                        <p>9:00 AM</p>
                	</div>
                </div>
            	<div className="group-content">
            		<label>Location</label>
            		<div className="need-map"></div>
            	</div>
            	<div className="group-content">
            		<label>Number of People Needed</label>
            		<p>12</p>
            	</div>
            	<div className="group-content">
            		<label>What to bring</label>
            		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute</p>
            	</div>
            </div>
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