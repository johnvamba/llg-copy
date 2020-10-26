import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GroupsActions from '../../../redux/groups/actions';
import DataTable from '../../../components/layout/DataTable';

import GroupsHeader from './header';
import List from './list';
import Form from './form';

const Groupss = () => {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [data, setData] = useState([
        {
            id: 1,
            title: 'Group Name 01',
            members: 32,
            privacy: 'Public',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        },
        {
            id: 2,
            title: 'Group Name 01',
            members: 32,
            privacy: 'Public',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        },
        {
            id: 3,
            title: 'Group Name 01',
            members: 32,
            privacy: 'Public',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        },
        {
            id: 4,
            title: 'Group Name 01',
            members: 32,
            privacy: 'Public',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        },
        {
            id: 5,
            title: 'Group Name 01',
            members: 32,
            privacy: 'Public',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        },
        {
            id: 6,
            title: 'Group Name 01',
            members: 32,
            privacy: 'Public',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        },
        {
            id: 7,
            title: 'Group Name 01',
            members: 32,
            privacy: 'Public',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        },
    ]);

    const handleActions = (row) => {
        row.actions = row.actions ? false : true;
        setData(data.map((obj) => {
            if(obj.id == row.id) return row;
            else{
                obj.actions = false;
                return obj;
            }
        }));
    }

    return (
        <>
            <GroupsHeader
                setShowAdd={setShowAdd}
            />
            <List
                data={data}
                setShowEdit={setShowEdit}
                handleActions={handleActions}
            />

            {   
                (showAdd || showEdit) && 
                    <Form
                        showAdd={showAdd}
                        setState={showAdd ? setShowAdd : setShowEdit }
                    />
            }
        </>
    )
}

export default Groupss;