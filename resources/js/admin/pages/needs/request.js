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

import NeedForm from './form'
import NeedTable from './table'
import NeedInfo from './info'

const Needs = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [tab, setTab] = useState('request'); //current or past
    const [form, showForm] = useState(false); //false
    const [info, showInfo] = useState(null);
    const needs = useSelector(
        state => state.NeedsReducer.needs
    )

    const data = [
        {
            id: 4,
            title: 'Title',
            type: 'Volunteer',
            goal: "N/A",
            status: 'pending',
            date: '08/27/2020'
        }, {
            id: 5,
            title: 'Title',
            type: 'Volunteer',
            goal: "N/A",
            status: 'pending',
            date: '08/27/2020'
        },{
            id: 6,
            title: 'Title',
            type: 'Volunteer',
            goal: "N/A",
            status: 'pending',
            date: '08/27/2020'
        }
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.post('/api/need/lists', {
                'limit': limit
            });

            dispatch(NeedsActions.setNeeds(data));
        }

        fetchData();
    }, [limit])

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }
    const handleTab = (tab = 'all')=>{
        //change content of table here
        setTab(tab)
    }

    const handleForm = (form = false, setting = null)=>{
        //change content of table here
        if(setting == 'discard'){
            //discard Changes here
        }
        if(setting == 'submit'){
            //discard Changes here
        }
        showForm(form)
    }
    const handleInfo = (item) => {
        showForm(false);
        showInfo(item);
    }

    return (
        <>
            <div className="h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <ul className="nav-tab">
                    <li className={`nav-tab-item ${tab=='request' ? 'active' : ''}`} onClick={()=>handleTab('request')}>Request ({ needs.requests || 0 })</li>
                </ul>
                <Button className="ml-auto text-white bg-blue-500 hover:bg-blue-600" onClick={()=>showForm(true)}>
                    <i className="fas fa-plus pr-2"></i>
                    <span>Create Need</span>
                </Button>
            </div>

            <div className="flex flex-col p-8">
                <NeedTable tab={tab} data={data} showInfo={handleInfo}/> 
            </div>
            {
                form && 
                <NeedForm handleForm={handleForm}/>
            }
            {
                info && 
                <NeedInfo toClose={e=>setInfo(null)} data={info}/>
            }
        </>
    )
}

export default Needs;