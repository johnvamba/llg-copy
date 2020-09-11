import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as OrganizationsActions from '../../../redux/organizations/actions';

import DataTable from '../../../components/layout/DataTable';

const Organizations = () => {
    const [limit, setLimit] = useState(5);
    const organizations = useSelector(
            state => state.OrganizationsReducer.organizations
        ); 

    const disptach = useDispatch();

    useEffect(() => {
        async function fetchOrg() {
            let {data} = await axios.post('/api/organization/table', {
                    limit: limit
                });

            disptach(OrganizationsActions.setOrganizations(data));
        }

        fetchOrg()
    }, [limit]);

    const handleLimitChange = (value) => {
        setLimit(parseInt(value));
    }

    return (
        <div className="flex flex-col flex-wrap">
            <DataTable
                module={organizations.module}
                tableHeader={organizations.columns}
                tableRow={organizations}
                limitChange={handleLimitChange}
            />
        </div>
    )
}

export default Organizations;