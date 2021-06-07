import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import PushHeader from './header';
import PushList from './list';
import PushForm from './form';

import './push-notification.css';

const PushNotification = () => {
    const loc = useLocation();
    const [focus, setFocus] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(15);
    const [meta, setMeta] = useState({})
    const [page, setPage] = useState(1);
    const [status, setTab] = useState('all'); //current or past

    useEffect(()=>{
        const { pathname } = loc 
        switch(pathname) {
            case '/notifications/scheduled':
            setTab('scheduled');
            break;
            case '/notifications/sent':
            setTab('sent');
            break;
            case '/notifications':
            default:
            setTab('all');
            break;
        }
    }, [loc])

    const [counts, setCounts] = useState({
        all: 0,
        scheduled: 0,
        sent: 0
    });

    useEffect(() => {
        setLoading(false)
        loadTab(false);
    }, [status])

    const handleForm = (focus = {}, showForm = false, type = null) => {
        setFocus(focus)
        setShowForm(showForm)
        if(type == 'submit') {
            loadTab(true);
        }
    }

    const handleTab = (status = 'all')=>{
        //change content of table here
        setTab(status)
    }

    const loadTab = (clearCache=false) => {
        setLoading(true)
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        api.get(`/api/web/pushs`, {
            params: {
                ...addFilter,
                status,
                per_page: limit || 15,
                page
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then(({ data })=>{
            setData( [...data.data ]);
            setCounts({
                all: 0,
                scheduled: 0,
                sent: 0,
                ...data.count
            })
            setMeta( data.meta )
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

    return(
        <section className="push-notif">
            <PushHeader handleForm={handleForm} counts={counts} tab={status} handleTab={handleTab} />
            <PushList data={data} loading={loading} handleForm={handleForm} setPage={setPage} setLimit={setLimit} meta={meta}/>
            {
                showForm &&
                <PushForm data={focus} handleForm={handleForm} />
            }
        </section>
    )
}


export default PushNotification;