import React, { useState } from 'react';
import ApiHeader from './header';
import ApiList from './list';
import ApiForm from './form';

import './api.css';

const Api = () => {

    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    // disable opening edit form if create form is active
    const handleEditForm = () => {
        if(showCreate){
            setShowCreate(false);
            setShowEdit(true);
        }else setShowEdit(true);
    }

    return(
        <>
            <section>
                <ApiHeader setShowCreate={setShowCreate} />
                <ApiList handleEditForm={handleEditForm} />
                {
                    (showCreate || showEdit) && <ApiForm activeForm={showCreate ? 'Create' : 'Edit'} handleCloseForm={showCreate ? setShowCreate : setShowEdit} />
                }
            </section>
        </>
    )
}


export default Api;