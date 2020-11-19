import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GroupsActions from '../../../redux/groups/actions';
import DataTable from '../../../components/layout/DataTable';

import GroupsHeader from './header';
import GroupsList from './list';
import GroupsForm from './form';

const Groups = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [focus, setFocus] = useState({});

    const [groups, setGroups] = useState([]);

    useEffect(()=>{
        loadTable()
    }, [page])

    const loadTable = (clearCache = false) => {
        const token = axios.CancelToken.source();
        setLoading(true);
        api.get(`/api/web/groups`, {
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
            setGroups( page == 1 ? data.data : [...groups, ...data.data])
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

    const handleActionButtons = (row) => {
        row.actions = row.actions ? false : true;
        setGroups(groups.map((obj) => {
            if(obj.id == row.id) return row;
            else{
                obj.actions = false;
                return obj;
            }
        }));
    }

    const handleForm = (data={}, showForm=false)=>{
        setFocus(data)
        setShowForm(showForm)
    }

    const afterSubmit = (data = {}) => {
        // setGroups([data, ...groups])
        loadTable(true)
    }

    return (
        <>
            <GroupsHeader
                setShowAdd={()=>handleForm({}, true)}
            />

            <GroupsList
                data={groups}
                handleForm={handleForm}
                afterSubmit={afterSubmit}
                handleActionButtons={handleActionButtons}
            />

            {   
                showForm && 
                <GroupsForm
                    data={focus}
                    handleForm={handleForm}
                    afterSubmit={afterSubmit}
                />
            }
        </>
    )
}

export default Groups;