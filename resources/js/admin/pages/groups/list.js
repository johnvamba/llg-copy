import React, { useState } from 'react';
import GroupsActionsIcon from '../../../svg/groups-actions';
import GroupsTriangle from '../../../svg/group-triangle';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';

import './groups.css';

const GroupsHeader = ({ data, setShowEdit, handleActions }) => {

    const [showAction, setShowAction] = useState(false);

    return (
        <>
            <section className="groups-list">
                <ul>
                    {data.map((obj) => 
                        <li key={obj.id}>
                            <header>
                                <div></div>
                            </header>
                            <div className="groups-list__body">
                                <h2>{obj.title}</h2>
                                <div>
                                    <span>{`${obj.privacy} Group`}</span>
                                    <span>.</span>
                                    <span>{`${obj.members} members`}</span>
                                </div>
                                <p>{obj.description}</p>
                                <div className="groups-list__progress-bar">
                                    <label>2/8 Goals</label>
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 text-xs flex rounded">
                                            <div style={{ width: "12.5%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`actions ${obj.actions ? 'active' : null}`} onClick={() => handleActions(obj)}>
                                <div className="actions__toggle">
                                    <GroupsActionsIcon />
                                </div>
                                
                                {
                                    obj.actions && (
                                        <div className="actions__content">
                                            <GroupsTriangle />
                                            <div>
                                                <div onClick={() => setShowEdit(true)}>
                                                    <UsersActionsEdit />
                                                    <span>Edit</span>
                                                </div>
                                                <div>
                                                    <UsersActionsDelete />
                                                    <span>Delete</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                
                            </div>
                        </li>
                    )}
                </ul>
            </section>
        </>
    )
}
export default GroupsHeader;