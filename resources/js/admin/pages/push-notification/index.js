import React, { useState } from 'react';
import PushHeader from './header';
import PushList from './list';
import PushForm from './form';

import './push-notification.css';

const PushNotification = () => {

    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseForm = () => {
        setShowCreate(false);
        setShowEdit(false);
    }

    return(
        <>
            <section className="push-notif">
                <PushHeader setShowCreate={setShowCreate} />
                <PushList showEdit={showEdit} setShowEdit={setShowEdit} />

                {
                    (showCreate || showEdit) &&
                        <PushForm activeForm={showCreate ? 'Create' : 'Edit'} handleCloseForm={handleCloseForm} />
                }
            </section>
        </>
    )
}


export default PushNotification;