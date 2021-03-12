import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
// import * as NeedsActions from '../../../redux/needs/actions';
import { setOrg, setNeedId } from '../../../redux/stories/actions';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';

import Button from '../../../components/Button';
import Paginator from '../../../components/Paginator';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
import Quill from '../../../svg/quill'
import './needs.css';
import Swal from 'sweetalert2';

import NeedForm from './form'
import NeedTable from './table'
import NeedInfo from './info'
import StoriesForm from '../stories/form'
import OffersPlus from '../../../svg/offers-plus';
import { CancelToken } from 'axios'

const Needs = ({NeedsReducer}) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [tab, setTab] = useState('all'); //current or past
    const [tabCounts, setTabCounts] = useState({
        aggregate: 0,
        current: 0,
        past: 0,
    })
    const [meta, setMeta] = useState({});
    const [form, showForm] = useState(false); //false
    const [story, showStoryForm] = useState(false); //false

    const [bolInfo, showInfo] = useState(false);
    const [info, setInfo] = useState(null);

    const [loading, setLoading] = useState(false);

    const [arrayNeeds, setNeeds] = useState([]);

    const { needs, type, startdate, enddate, min, max, dateType, filter } = NeedsReducer

    const dispatch = useDispatch();

    const search = useSelector(({SearchReducer}) => SearchReducer.search);

    useEffect(() => {
        setLoading(true)
        const ct = loadTable();
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, [ tab, page, needs, type, startdate, enddate, min, max, dateType, limit, search ]);

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
            const { aggregate, current, past} = data
            setNeeds(data.data)
            setMeta(data.meta)
            setTabCounts({ aggregate, current, past})
            setLoading(false)
        }).finally(()=>{
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

    const handleForm = (info={}, form = false, setting = 'close', story = false)=>{
        //change content of table here
        setInfo(story ? {} : info) //dont set info?
        showForm(form)
        showStoryForm(story)
        switch(setting){
            case 'story':
            dispatch( setOrg(info) );
            dispatch( setNeedId(info.id) );
            break;
            case 'discard':
            break;
            case 'submit':
            loadTable(true)
            break;
            default:
            break;
        }
    }

    const remove = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You will delete this need ${item.title}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                handleForm();
                api.delete(`/api/web/needs/${item.id}`)
                .then(()=>{
                    loadTable(true);
                    swalSuccess('Need has been deleted');
                }).catch(()=>{
                    swalError("There's has been an error on deleting need");
                })
            }
        })
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

    const afterSubmit = ()=>{
        // loadTable(true)
    }

    return (
        <>
            <div className="h-16 flex flex-row justify-between items-center border-b bg-white px-12">
                <ul className="nav-tab">
                    <li className={`nav-tab-item ${tab=='all' ? 'active' : ''}`} onClick={()=>handleTab('all')}>All ({ tabCounts.aggregate || 0 })</li>
                    <li className={`nav-tab-item ${tab=='current' ? 'active' : ''}`} onClick={()=>handleTab('current')}>Current ({ tabCounts.current || 0 })</li>
                    <li className={`nav-tab-item ${tab=='past' ? 'active' : ''}`} onClick={()=>handleTab('past')}>Past ({ tabCounts.past || 0 })</li>
                </ul>
                <button className="primary-btn page-header-btn flex rounded-sm" onClick={(e)=>openForm(e, true)}>
                    <OffersPlus />
                    <span className="page-header-btn__text">Create Need</span>
                </button>
            </div>

            <div className="component-body flex flex-col p-8">
                <NeedTable tab={tab} data={arrayNeeds} removeNeed={remove} showInfo={handleInfo} handleForm={handleForm} loading={loading}/> 
                <Paginator setLimit={setLimit} {...meta} clickedPage={setPage}/>
            </div>
            {
                form && 
                <NeedForm handleForm={handleForm} data={info || {}}/>
            }
            {
                (info && bolInfo) && 
                <NeedInfo toClose={e=>setInfo(null)} delete={()=>remove(info)} clickEdit={openForm} data={info} openStory={()=>handleForm(info, false, 'story', true)}/>
            }
            {
                story && //Open story here
                <StoriesForm data={{}} handleForm={handleForm} afterSubmit={afterSubmit}/>
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