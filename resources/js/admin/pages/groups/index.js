import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GroupsActions from '../../../redux/groups/actions';
import LoadingScreen from '../../../components/LoadingScreen'

import GroupsHeader from './header';
import GroupsList from './list';
import GroupsForm from './form';
import GroupView from './view';
import './groups.css';

const Groups = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [view, setView] = useState(false);
    const [focus, setFocus] = useState({});
    const [groups, setGroups] = useState([]);
    const [count, setCount] = useState(0);
    const search = useSelector(({SearchReducer}) => SearchReducer.search);

    useEffect(()=>{
        loadTable()
    }, [page, search])

    const loadTable = (clearCache = false) => {
        const token = axios.CancelToken.source();
        setLoading(true);
        api.get(`/api/web/groups`, {
            params: {
                page, search
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            setGroups( data.data)
            setCount( data.meta ? data.meta.total : 0)
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

    const loadNextPage = (clearCache = false) => {
        const _page = page + 1;
        if(_page <= endPage && endPage > 1){
            const token = axios.CancelToken.source();
            api.get(`/api/web/groups`, {
                params: {
                    page: _page, search
                },
                cache: {
                    exclude: { query: false },
                }, 
                clearCacheEntry: clearCache,
                cancelToken: token.token
            }).then((res)=>{
                const { data } = res
                setGroups( [...groups, ...data.data])
                setPage( data.meta ? data.meta.current_page : 1)
                setEndPage( data.meta ? data.meta.last_page : 1)
                setCount( data.meta ? data.meta.total : 0)
            }).finally(()=>{
                setLoading(false)
            })
            return token; //for useEffect
        }
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

    const handleForm = (data={}, showForm=false, showView=false)=>{
        setFocus(data)
        setShowForm(showForm)
        setView(showView)
    }

    const afterSubmit = (data = {}) => {
        // setGroups([data, ...groups])
        loadTable(true)
    }

    return (
        <>
            <GroupsHeader
                count={count}
                setShowAdd={()=>handleForm({}, true)}
            />
            {
                loading ? <LoadingScreen title={'Loading Groups'}/> :
                <GroupsList
                    data={groups}
                    handleForm={handleForm}
                    afterSubmit={afterSubmit}
                    handleActionButtons={handleActionButtons}
                    triggerPage={loadNextPage}
                />
            }

            {   
                showForm && 
                <GroupsForm
                    data={focus}
                    handleForm={handleForm}
                    afterSubmit={afterSubmit}
                />
            }
            {
                view && 
                <GroupView data={focus} handleForm={handleForm} closePanel={()=>setView(false)}/>
            }
        </>
    )
}

export default Groups;