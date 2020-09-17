import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as NeedsActions from '../../../redux/needs/actions';
import DataTable from '../../../components/layout/DataTable';

const Needs = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const needs = useSelector(
            state => state.NeedsReducer.needs
        )

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let {data} = await axios.post('/api/need/lists', {
                    'limit': limit
                });

            dispatch(NeedsActions.setNeeds(data));
        }

        fetchData();
    }, [limit])

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    return (
        <div className="flex flex-col p-12">
            <DataTable
                module={needs.module}
                records={needs}
                changeLimit={handleLimitChange}
                currentPage={page}
                changePage={handleChangePage}
            />
        </div>
    )
}

export default Needs;