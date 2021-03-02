import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UsersActions from '../../../redux/users/actions';
import Paginator from '../../../components/Paginator';

import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';

import UsersHeader from './header';
import UserTable from './table';
import OffersPlus from '../../../svg/offers-plus';
import UsersForm from './form';
import UserInfo from './info';
import './users.css';

const Users = () => {
    const [page, setPage] = useState(1); 
    const [limit, setLimit] = useState(15);
    const [meta, setMeta] = useState({});

    const [showForm, setShowForm] = useState(false);
    const [focus, setFocus] = useState({});
    const [count, setCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [userData, setUserData] = useState({
        title: '',
        email: '',
        age: 0,
        bio: '',
        dateAdded: '',
    });
    const search = useSelector(({SearchReducer}) => SearchReducer.search);
    const roles = useSelector(state => state.AuthUserReducer.roles);

    const dispatch = useDispatch();

    const loadTable = (clearCache = false) => {
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        api.get(`/api/web/users`, {
            params: {
                page, ...addFilter,
                per_page: limit,
                search
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            const { users_count } = data
            setUsers(data.data || [])
            setCount(users_count || 0)
            setMeta(data.meta)
            setLoading(false)
        }).finally(()=>{
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
    }, [page, limit, search]);
    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    const showItem = (data={}, showForm=false, showInfo=false) => {
        setShowForm(showForm);
        setFocus(data);
        setShowInfo(showInfo)
    }

    const handleForm = (form = false, setting = null, data = null)=>{
        //change content of table here
        console.log('form changed', form, data, setting)
        if(setting == 'discard'){
            //discard Changes here
        }
        if(setting == 'submit'){
            //reload table
            loadTable(true)
            //or insert data here
        }
        setShowForm(form)
    }

    return (
        <>
            <section className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>Users { count > 0 ? `(${count})` : ''}</h1>
                </div>
                <div className="flex flex-1 justify-end">
                    <button className="primary-btn flex rounded-sm" onClick={() => setShowForm(true)}>
                        <OffersPlus />
                        <span>Add User</span>
                    </button>
                </div>
            </section>
            <div className="component-body flex flex-col p-8">
                <UserTable data={users} showInfo={showItem} loading={loading}/>
                <Paginator setLimit={setLimit} {...meta} clickedPage={setPage}/>
            </div>
            {
                showForm && 
                <UsersForm data={focus} handleForm={handleForm} showItem={showItem} />
            }
            {
                showInfo &&
                <UserInfo data={focus} closePanel={()=>showItem({})} handleForm={handleForm}/>
            }
        </>
    )
}

export default Users;