import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import * as OrganizationsActions from '../../../redux/organizations/actions';
import Header from './header';
import List from './list';
import Form from './form';
import OrgView from './info';
import OrgInvite from './invite';
import OrgPending from './pending';

import LoadingScreen from '../../../components/LoadingScreen'

import './organizations.css';


const Organizations = (props) => {
    const loc = useLocation();
    const hist = useHistory();
    const params = useParams();
    const [page, setPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [orgs, setOrgs] = useState([]);
    const [count, setCount] = useState(0);

    const [info, setInfo] = useState({});
    const [form, showForm] = useState(false);
    const [invite, showInvite] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [pending, setPending] = useState(false);

    const search = useSelector(({SearchReducer}) => SearchReducer.search);
    const dispatch = useDispatch();

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    const loadTable = (clearCache = false) => {
        setLoading(true)
        const addFilter = {}; //for redux values
        let requests = loc.pathname.indexOf('/organisations/requests') == 0;
        const token = axios.CancelToken.source();
        api.get(`/api/web/organizations`, {
            params: {
                page, ...addFilter, search, requests
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then(({ data })=>{
            const { org_count } = data
            setOrgs( data.data )
            setCount(data.meta ? data.meta.total : 0)
            setEndPage(data.meta ? data.meta.last_page : 1)
            setPage(data.meta ? data.meta.current_page : 0)
            setLoading(false)
        }).finally(()=>{
        })
        return token; //for useEffect
    }
    //To always get fresh new ones
    const nextPage = (clearCache = true) => {
        const nextpage = page+1;
        let requests = loc.pathname.indexOf('/organisations/requests') == 0;
        if(nextpage <= endPage && endPage > 1){
            const addFilter = {};
            const token = axios.CancelToken.source();
            api.get(`/api/web/organizations`, {
                params: {
                    ...addFilter,
                    page: nextpage, search, requests
                },
                cache: {
                    exclude: { query: false },
                }, 
                clearCacheEntry: clearCache,
                cancelToken: token.token
            }).then(({ data })=>{
                const { org_count } = data
                setOrgs( [...orgs, ...data.data] )
                setCount(data.meta ? data.meta.total : 0)
                setEndPage(data.meta ? data.meta.last_page : 1)
                setPage(data.meta ? data.meta.current_page : 0)
            }).finally(()=>{
            })
            return token; //for useEffect
        }
    }


    useEffect(() => {
        const ct = loadTable();
        setInfo({})
        showForm(false)
        setShowInfo(false)
        showInvite(false)
        setPending(false)
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, [search, loc]);

    useEffect(()=>{
        if(params.id) {
            handlePanels(params, false, true);
        }
    }, [params])
    
    const handlePanels = (data = {},  form = false, info = false, invite = false) => {
        let requests = loc.pathname.indexOf('/organisations/requests') == 0;
        setInfo(data)
        showForm(form)
        if(requests) {
            setPending(info)
        } else {
            setShowInfo(info)
        }
        showInvite(invite)
    }

    const afterSubmit = (reload = false) =>{
        let requests = loc.pathname.indexOf('/organisations/requests') == 0;

        if(reload && requests) {
            api.get(`/api/web/organizations`, {
                params: {
                    page, search, requests: !requests,
                },
                cache: {
                    exclude: { query: false },
                }, 
                clearCacheEntry: true,
            })
        }
        loadTable(true)
    }

    const handleDelete = ()=>{
        handlePanels({})
        loadTable(true)
        
    }

    return (
        <>
            <Header count={count} handlePanels={handlePanels} />
            {
                loading ? <LoadingScreen title={'Loading Organisations'}/>
                : <List set={orgs} handlePanels={handlePanels} triggerPage={nextPage}/>
            }
            {
                form && <Form data={info} afterSubmit={afterSubmit} handlePanels={handlePanels} handleClose={handlePanels}/>
            }
            { 
                showInfo && <OrgView
                    data={info}
                    closePanel={handlePanels}
                    handleEdit={() => handlePanels(info, true)}
                    handleInvite={() => handlePanels(info, false, false, true)}
                    handleDelete={handleDelete }
                />
            }
            { 
                pending && <OrgPending
                    data={info}
                    afterSubmit={()=>afterSubmit(true)}
                    closePanel={handlePanels}
                    handleEdit={() => handlePanels(info, true)}
                />
            }
            {
                invite && 
                <OrgInvite data={info} handleBackInvite={() => handlePanels(info, false, true)} />
            }
        </>
    )
}

export default Organizations;