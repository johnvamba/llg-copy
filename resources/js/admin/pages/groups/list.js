import React, { useState } from 'react';
import GroupsActionsIcon from '../../../svg/groups-actions';
import GroupsTriangle from '../../../svg/group-triangle';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';
import { swalDelete2 } from '../../../components/helpers/alerts';

const GroupsList = ({ data = [], handleForm, handleActionButtons, afterSubmit }) => {
    const removeGroup = (obj = {})=>{
        if(obj.id)
        swalDelete2(obj.name)
            .then(()=> {
                // setLoading('Deleting Group...')
                api.delete(`/api/web/groups/${obj.id}`)
                .then(()=>{
                    afterSubmit();
                }).finally(()=>{
                    // setLoading(null)
                    handleForm()
                })
            })
        //add api here
    }
    return (
        <section className="component-body groups-list">
            <ul>
                {data.map((obj) => 
                    <li key={obj.id}>
                        <header>
                            <div style={{backgroundImage: `url(${obj.photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} ></div>
                        </header>
                        <div className="groups-list__body" onClick={()=>handleForm(obj, false, true)}>
                            <h2>{obj.name}</h2>
                            <div>
                                <span>{`${obj.privacy || 'Private'} Group`}</span>
                                <span>.</span>
                                <span>{`${obj.participants_count || '0'} members`}</span>
                            </div>
                            <p>{obj.short_description || 'Description not found'}</p>
                            <div className="groups-list__progress-bar">
                                <label>{obj.goal_ratio || 0} Goals</label>
                                <div className="relative pt-1">
                                    <div className="overflow-hidden h-2 text-xs flex rounded">
                                        <div style={{ width: `${obj.goal_percent || 0}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`actions ${obj.actions ? 'active' : null}`} onClick={() => handleActionButtons(obj)}>
                            <div className="actions__toggle">
                                <GroupsActionsIcon />
                            </div>
                            
                            {
                                obj.actions && (
                                    <div className="actions__content">
                                        <GroupsTriangle />
                                        <div>
                                            <div onClick={() => handleForm(obj, true)}>
                                                <UsersActionsEdit />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=>removeGroup(obj)}>
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
    )
}
export default GroupsList;