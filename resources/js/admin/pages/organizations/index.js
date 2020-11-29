import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as OrganizationsActions from '../../../redux/organizations/actions';
import Header from './header';
import List from './list';
import Form from './form';
import OrgView from './info';
import OrgInvite from './invite';

import './organizations.css';


const Organizations = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [orgs, setOrgs] = useState([]);
    const [count, setCount] = useState(0);

    const [info, setInfo] = useState({});
    const [form, showForm] = useState(false);
    const [invite, showInvite] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const dispatch = useDispatch();

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    const loadTable = (clearCache = false) => {
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        api.get(`/api/web/organizations`, {
            params: {
                page, ...addFilter
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then(({ data })=>{
            const { org_count } = data
            setOrgs(data.data || [])
            setCount(data.meta ? data.meta.total : 0)
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

    useEffect(() => {
        setLoading(true)
        const ct = loadTable();
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, []);

    const handlePanels = (data = {},  form = false, info = false, invite = false) => {
        setInfo(data)
        showForm(form)
        setShowInfo(info)
        showInvite(invite)
    }

    const afterSubmit = () =>{
        loadTable(true)
    }

    return (
        <>
            <Header count={count} handlePanels={handlePanels} />
            <List set={orgs} handlePanels={handlePanels} />
            {
                form && <Form data={info} afterSubmit={afterSubmit} handlePanels={handlePanels} handleClose={handlePanels}/>
            }
            { 
                showInfo && <OrgView
                    data={info}
                    closePanel={handlePanels}
                    handleEdit={() => handlePanels(info, true)}
                    handleInvite={() => handlePanels(info, false, false, true)}
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