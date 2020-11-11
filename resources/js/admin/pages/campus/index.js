import React, { useEffect, useState } from 'react';
import CampusHeader from './header';
import CampusList from './list';
import CampusForm from './form';
import CampusView from './view';


const Campus = () => {
    const [form, showForm] = useState(false); //false
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [info, setInfo] = useState({});

    const [campuses, setCampuses] = useState([]);

    useEffect(() => {
        setLoading(true)
        const ct = loadTable();
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, [ page ]);

    const loadTable = (clearCache = false) => {
        const token = axios.CancelToken.source();
        api.get(`/api/web/campuses`, {
            params: {
                page, 
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            setCampuses(data.data)
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

    const handleForm = (data = {}, form = true, showInfo = false) => {
        setInfo(data)
        showForm(form);
        setShowInfo(showInfo);
    }

    const afterSubmit = (data = {}) => {
        //do data manipulation here.
    }

    return(
        <>
            <CampusHeader setShowAdd={() => handleForm({}, true, false)} />
            <CampusList campuses={campuses} setShowView={handleForm} />
            {
                form && <CampusForm data={info} afterSubmit={afterSubmit} handleForm={handleForm} />
            }
            {
                showInfo && <CampusView data={info} handleForm={handleForm} />
            }
        </>
    )
}

export default Campus;