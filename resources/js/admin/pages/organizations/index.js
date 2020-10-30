import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as OrganizationsActions from '../../../redux/organizations/actions';
import Header from './header';
import List from './list';
import Form from './form';
import OrgView from './info';
import OrgInvite from './invite';
import OrgInvite2 from './invite2';

import './organizations.css';


const Organizations = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [showAddOrg, setShowAddOrg] = useState(false);
    const [showEditOrg, setShowEditOrg] = useState(false);
    const [showViewOrg, setShowViewOrg] = useState(false);
    const [showInvite, setShowInvite] = useState(false);


    const organizations = useSelector(
        state => state.OrganizationsReducer.organizations
    );

    const disptach = useDispatch();

    useEffect(() => {
        async function fetchOrg() {
            let { data } = await axios.post('/api/organization/lists', {
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

    const [data, setData] = useState({
        id: 1,
        name: 'test',
        site: 'test.com',
        phone_number: '9820931',
        email: 'test@gmail.com',
        description: 'dasdsadasda'
    });

    const handleInvite = () => {
        setShowViewOrg(false);
        setShowInvite(true);
    }

    const handleBackInvite = () => {
        setShowViewOrg(true);
        setShowInvite(false);
    }

    const handleEdit = () => {
        setShowEditOrg(true);
        setShowViewOrg(false);
    }

    const handleClose = () => {
        setShowEditOrg(false);
        setShowAddOrg(false);
    }

    return (
        <>
            <Header
                setState = {setShowAddOrg}
            />
            <List
                setState = {setShowViewOrg}
            />
            {
                (showAddOrg || showEditOrg) && 
                    <Form
                        page={showAddOrg ? 'Add' : 'Edit'}
                        handleClose={handleClose}
                    />
            }
            {showViewOrg && 
                <OrgView
                    setShowViewOrg={setShowViewOrg}
                    handleEdit={handleEdit}
                    handleInvite={handleInvite}
                />
            }
            {showInvite && 
                <OrgInvite handleBackInvite={handleBackInvite} />
            }
        </>
    )
}

export default Organizations;