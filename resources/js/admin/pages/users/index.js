import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UsersActions from '../../../redux/users/actions';
import DataTable from '../../../components/layout/DataTable';

const Users = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
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

    if (roles.name !== 'admin') {
        window.location = '/admin';
    }

    return (
        <>
            <div className="h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>Users</h1>
                </div>
            </div>
            <div className="flex flex-col p-12">
                <DataTable
                    module={users.module}
                    records={users}
                    changeLimit={handleLimitChange}
                    currentPage={page}
                    changePage={handleChangePage}
                />
            </div>
        </>
    )
}

export default Users;