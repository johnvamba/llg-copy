import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GroupsActions from '../../../redux/groups/actions';
import DataTable from '../../../components/layout/DataTable';

const Groups = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const groups = useSelector(
        state => state.GroupsReducer.groups
    );
    const roles = useSelector(state => state.AuthUserReducer.roles);

    const disptach = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.post('/api/group/lists', {
                limit: limit
            });

            disptach(GroupsActions.setGroups(data));
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
                    <h1>Groups</h1>
                </div>
            </div>
            <div className="flex flex-col p-12">
                <DataTable
                    module={groups.module}
                    records={groups}
                    changeLimit={handleLimitChange}
                    currentPage={page}
                    changePage={handleChangePage}
                    canAdd={false}
                />
            </div>
        </>
    )
}

export default Groups;