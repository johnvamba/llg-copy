import React, { useEffect, useState } from 'react';
import CampusHeader from './header';
import CampusList from './list';
import CampusForm from './form';
import CampusView from './view';


const Campus = () => {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showView, setShowView] = useState(false);

    const handleClose = () => {
        setShowAdd(false);
        setShowEdit(false);
    }

    const handleEdit = () => {
        setShowView(false);
        setShowEdit(true);
    }

    return(
        <>
            <CampusHeader setShowAdd={setShowAdd} />
            <CampusList setShowView={setShowView} />
            {
                (showAdd || showEdit) && <CampusForm activeForm={showEdit ? 'Edit' : 'Add'} handleClose={handleClose} />
            }
            {
                showView && <CampusView setShowView={setShowView} handleEdit={handleEdit} />
            }
        </>
    )
}

export default Campus;