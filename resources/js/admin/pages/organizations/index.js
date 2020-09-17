import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as OrganizationsActions from '../../../redux/organizations/actions';

import DataTable from '../../../components/layout/DataTable';

const Organizations = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const organizations = useSelector(
            state => state.OrganizationsReducer.organizations
        ); 

    const disptach = useDispatch();

    useEffect(() => {
        async function fetchOrg() {
            let {data} = await axios.post('/api/organization/lists', {
                    limit: limit
                });

            disptach(OrganizationsActions.setOrganizations(data));
        }

        fetchOrg()
    }, [limit]);

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    return (
        <div className="flex flex-col flex-wrapp p-12">
            <DataTable
                module={organizations.module}
                records={organizations}
                changeLimit={handleLimitChange}
                currentPage={page}
                changePage={handleChangePage}
            />
        </div>
    )
}

export default Organizations;