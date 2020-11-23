import React, { useState, useEffect } from 'react';
import PushHeader from './header';
import PushList from './list';
import PushForm from './form';

import './push-notification.css';

const PushNotification = () => {
    const [focus, setFocus] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [counts, setCounts] = useState({
        all: 0,
        scheduled: 0,
        sent: 0
    });
    const [tab, setTab] = useState('all'); //current or past

    useEffect(() => {
        setLoading(false)
        loadTab(false, tab);
    }, [tab])

    const handleForm = (focus = {}, showForm = false) => {
        setFocus(focus)
        setShowForm(showForm)
    }

    const handleTab = (tab = 'all')=>{
        //change content of table here
        setTab(tab)
    }

    const loadTab = (clearCache=false, tab = null) => {

    }

    return(
        <section className="push-notif">
            <PushHeader handleForm={handleForm} counts={counts} tab={tab} handleTab={handleTab} />
            <PushList data={data} handleForm={handleForm}/>
            {
                showForm &&
                <PushForm data={focus} handleForm={handleForm} />
            }
        </section>
    )
}


export default PushNotification;