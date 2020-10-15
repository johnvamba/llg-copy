import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as NeedsActions from '../../../redux/needs/actions';
// import DataTable from '../../../components/layout/DataTable';
import Button from '../../../components/Button';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
//As test icon only
// import IconTest from '../../../svg/icon-test'

import './needs.css';

const NeedInfo = ({data}) => {
    if(!data)
    	return '';

    return (
        <div className="need-info">
            <div className="need-header">
            	<i className="circlet"></i>
            	<h4 className="need-status">On-Going</h4>
            	<Button><i className="fas fa-pencil"/>Edit</Button>
            </div>
            <div className="need-content">
            	<div className="need-title">
	            	<h3>Title</h3>
	            	<span>08/27/20</span>
	            	<h5>Volunteer</h5>
            	</div>
            	<div className="group-content">
            		<label>Categories</label>
            	</div>
            	<div className="group-content w-1\/2">
            		<label>Date Needed</label>
            	</div>
            	<div className="group-content w-1\/2">
            		<label>Time</label>
            	</div>
            	<div className="group-content">
            		<label>Location</label>
            		<p></p>
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
        </div>
    )
}

export default NeedInfo;