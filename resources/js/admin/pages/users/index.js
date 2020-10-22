import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UsersActions from '../../../redux/users/actions';
import DataTable from '../../../components/layout/DataTable';

import UsersHeader from './header';
import UsersList from './list';
import UsersForm from './form';
import './users.css';

const Users = () => {
    const [page, setPage] = useState(1); 
    const [limit, setLimit] = useState(5);

    const [showAddUser, setShowAddUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [userData, setUserData] = useState({
        title: '',
        email: '',
        age: 0,
        bio: '',
        dateAdded: '',
    });


    const users = useSelector(
        state => state.UsersReducer.users
    );
    const roles = useSelector(state => state.AuthUserReducer.roles);

    const disptach = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.post('/api/users/lists', {
                limit: limit
            });

            disptach(UsersActions.setUsers(data));
        }

        fetchData();
    }, [limit]);

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }
    // if (roles.name !== 'admin') {
    //     window.location = '/admin';
    // }

    return (
        <>
            <UsersHeader setShowAddUser={setShowAddUser} />
            <UsersList setShowEditUser={setShowEditUser} />
            {
                (showAddUser || showEditUser) && <UsersForm setState={(showAddUser) ? setShowAddUser : setShowEditUser} state={userData} label={(showAddUser) ? 'Add User' : 'Edit User'} />
            }
        </>
    )
}

export default Users;