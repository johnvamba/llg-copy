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
import OffersPlus from '../../../svg/offers-plus';
import Paginator from '../../../components/Paginator';

import './needs.css';

import NeedForm from './form'
import NeedTable from './table'
import NeedInfo from './info'

import { CancelToken } from 'axios'

const Needs = ({NeedsReducer}) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [meta, setMeta] = useState({});
    const [tab, setTab] = useState('request'); //current or past
    const [tabCount, setTabCount] = useState(0);
    const [form, showForm] = useState(false); //false
    const [story, showStoryForm] = useState(false); //false
    const [bolInfo, showInfo] = useState(false);
    const [info, setInfo] = useState(null);

    const [loading, setLoading] = useState(false);

    const [arrayNeeds, setNeeds] = useState([]);

    const search = useSelector(({SearchReducer}) => SearchReducer.search);
    const { needs, type, startdate, enddate, min, max, dateType, filter } = NeedsReducer

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true)
        const ct = loadTable();
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, [ tab, page, needs, type, startdate, enddate, min, max, dateType, limit ]);

    const loadTable = (clearCache = false) => {
        const addFilter = filter ? { type, startdate, enddate, min, max } : {};
        const token = axios.CancelToken.source();
        api.get(`/api/web/needs`, {
            params: {
                tab, page, ...addFilter,
                per_page: limit || 15,
                search
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            setNeeds(data.data)
            if(clearCache){
                // console.log('clearCache true')
            }
            setMeta(data.meta)
            setTabCount(data.requests || 0);
            setLoading(false)
        }).finally(()=>{
        })
        //Why?? for all tabs?
        if(clearCache){
            api.get(`/api/web/needs`, {
                params: {
                    tab:'all', page, ...addFilter
                },
                cache: {
                    exclude: { query: false },
                }, 
                clearCacheEntry: clearCache,
                cancelToken: token.token
            })
        }
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

    const handleForm = (info={}, form = false, setting = 'close', data = null)=>{
        //change content of table here
        setInfo(info)
        showForm(form)
        showStoryForm(story)
        if(setting == 'discard'){
            //discard Changes here
        }
        if(setting == 'submit'){
            //reload table
            loadTable(true)
            //or insert data here
        }
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
            <div className="h-16 flex flex-row justify-between items-center border-b bg-white px-12">
                <div className="header-title flex flex-1">
                    <h1 className={`nav-tab-item ${tab=='request' ? 'active' : ''}`} onClick={()=>handleTab('request')}>Request ({ tabCount || 0 })</h1>
                </div>
                <div className="flex flex-1 justify-end">
                    <button className="primary-btn page-header-btn flex rounded-sm" onClick={(e)=>openForm(e, true)}>
                        <OffersPlus />
                        <span className="page-header-btn__text">Create Need</span>
                    </button>
                </div>
            </div>

            <div className="component-body flex flex-col p-8">
                <NeedTable tab={tab} data={arrayNeeds} showInfo={handleInfo} loading={loading} loadTable={loadTable}/> 
                <Paginator setLimit={setLimit} {...meta} clickedPage={setPage}/>
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