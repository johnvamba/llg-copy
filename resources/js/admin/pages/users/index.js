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

    const disptach = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.post('/api/users/lists', {
                limit: 5
            });

            disptach(UsersActions.setUsers(data));
        }

        fetchData();
    }, []);

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    return (
        <div className="flex flex-col">
            <DataTable
                module={users.module}
                records={users}
                changeLimit={handleLimitChange}
                currentPage={page}
                changePage={handleChangePage}
            />
        </div>
    )
}

export default Users;