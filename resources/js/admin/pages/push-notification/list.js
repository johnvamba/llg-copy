import React, { useState } from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';

const PushList = ({ showEdit, setShowEdit }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [users, setUsers] = useState(
        {
            data: [
                {
                    id: 1,
                    title: "Notification 01",
                    scheduleDate: "September 01, 2020",
                    scheduleTime: "9:00 AM",
                    status: "Scheduled", 
                },
                {
                    id: 2,
                    title: "Notification 01",
                    scheduleDate: "September 01, 2020",
                    scheduleTime: "9:00 AM",
                    status: "Sent", 
                },
                {
                    id: 3,
                    title: "Notification 01",
                    scheduleDate: "September 01, 2020",
                    scheduleTime: "9:00 AM",
                    status: "Sent", 
                },
                {
                    id: 4,
                    title: "Notification 01",
                    scheduleDate: "September 01, 2020",
                    scheduleTime: "9:00 AM",
                    status: "Scheduled", 
                },
                {
                    id: 5,
                    title: "Notification 01",
                    scheduleDate: "September 01, 2020",
                    scheduleTime: "9:00 AM",
                    status: "Scheduled", 
                },
                {
                    id: 6,
                    title: "Notification 01",
                    scheduleDate: "September 01, 2020",
                    scheduleTime: "9:00 AM",
                    status: "Scheduled", 
                },
            ]
        }
    )
    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = users.data.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        )
        setUsers({...users},{data : data});
    }

    const handleChange = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const data = users.data.map(obj => obj.id == row.id ? row : obj);
        setUsers({...users},{data : data});
    }

    const handleRowActive = (row) => {
        setShowEdit(true);
        row.active = 'active';
        const data = users.data.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
            }
        );
        setUsers({...users},{data : data});
    }

    return (
        <>
            <section className="push-list users-table offers-table flex flex-col p-8">
                <table>
                    <thead className="">
                        <tr>
                            <th className="checkbox">
                                <input type='checkbox' onChange={checkedAll} checked={isChecked} />
                            </th>
                            <th>Title</th>
                            <th>Schedule Date</th>
                            <th>Schedule Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.data.map((user, index) => 
                                <tr key={index} className={showEdit ? user.active : 'non-active'} >
                                    <td className="checkbox">
                                        <input type='checkbox' onChange={(e) => handleChange(user,e.target.checked)} checked={user.checked ? user.checked : false} />
                                        <label></label>
                                    </td>
                                    <td className="title" onClick={() => handleRowActive(user)}>
                                        <div className="title-img"></div>
                                        <p>
                                            {user.title}
                                        </p>
                                    </td>
                                    <td>
                                        <p>{user.scheduleDate}</p>
                                    </td>
                                    <td>
                                        <p>{user.scheduleTime}</p>
                                    </td>
                                    <td>
                                        <button className={`btn-${user.status == 'Scheduled' ? 'scheduled' : 'sent' }`}>
                                            {user.status}
                                        </button>
                                    </td>
                                    <td className="actions">
                                        <span onClick={() => handleRowActive(user)}>
                                            <UsersActionsEdit />
                                        </span>
                                        <span>
                                            <UsersActionsDelete />
                                        </span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}
export default PushList;