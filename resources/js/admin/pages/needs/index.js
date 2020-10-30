import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
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

import { CancelToken } from 'axios'

const Needs = ({NeedsReducer}) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [tab, setTab] = useState('all'); //current or past
    const [tabCounts, setTabCounts] = useState({
        aggregate: 0,
        current: 0,
        past: 0,
    })
    const [form, showForm] = useState(false); //false
    const [story, showStoryForm] = useState(false); //false

    const [bolInfo, showInfo] = useState(false);
    const [info, setInfo] = useState(null);

    const [loading, setLoading] = useState(false);

    const [arrayNeeds, setNeeds] = useState([]);

    const { needs, type, startdate, enddate, min, max, dateType, filter } = NeedsReducer

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true)
        const ct = loadTable();
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, [ tab, page, needs, type, startdate, enddate, min, max, dateType ]);

    const loadTable = (clearCache = false) => {
        const addFilter = filter ? { type, startdate, enddate, min, max } : {};
        const token = axios.CancelToken.source();
        api.get(`/api/web/needs`, {
            params: {
                tab, page, ...addFilter
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            const { aggregate, current, past} = data
            setNeeds(data.data)
            setTabCounts({ aggregate, current, past})
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

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

    const handleForm = (form = false, setting = null, data = null)=>{
        //change content of table here
        if(setting == 'discard'){
            //discard Changes here
        }
        if(setting == 'submit'){
            //reload table
            loadTable(true)
            //or insert data here
        }
        showForm(form)
    }

    const handleInfo = (item) => {
        // console.log('haaa?', item)
        showForm(false);
        showInfo(true);
        setInfo(item);
    }

    const openForm = (e, removeInfo = false) => {
        showForm(true)
        if(removeInfo) 
            setInfo(null)
        showInfo(false)
    }

    return (
        <>
            <div className="h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <ul className="nav-tab">
                    <li className={`nav-tab-item ${tab=='all' ? 'active' : ''}`} onClick={()=>handleTab('all')}>All ({ tabCounts.aggregate || 0 })</li>
                    <li className={`nav-tab-item ${tab=='current' ? 'active' : ''}`} onClick={()=>handleTab('current')}>Current ({ tabCounts.current || 0 })</li>
                    <li className={`nav-tab-item ${tab=='past' ? 'active' : ''}`} onClick={()=>handleTab('past')}>Past ({ tabCounts.past || 0 })</li>
                </ul>
                <Button className="ml-auto text-white bg-blue-500 hover:bg-blue-600" onClick={(e)=>openForm(e, true)}>
                    <i className="fas fa-plus pr-2"></i>
                    <span>Create Need</span>
                </Button>
            </div>

            <div className="flex flex-col p-8">
                <NeedTable tab={tab} data={arrayNeeds} showInfo={handleInfo} loading={loading}/> 
            </div>
            {
                form && 
                <NeedForm handleForm={handleForm} data={info || {}}/>
            }
            {
                (info && bolInfo) && 
                <NeedInfo toClose={e=>setInfo(null)} clickEdit={openForm} data={info}/>
            }
            {
                //story && //Open story here

            }
        </>
    )
}

export default connect(({NeedsReducer})=>{
    return {
        NeedsReducer
    }
},(dispatch)=>{
    return {

    }
})(Needs);