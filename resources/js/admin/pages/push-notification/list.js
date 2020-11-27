import React, { useState } from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';

const PushList = ({ showEdit, handleForm}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [notifs, setNotifs] = useState(
        [
            {
                id: 1,
                title: "Notification 01",
                scheduleDate: "September 01, 2020",
                scheduleTime: "9:00 AM",
                status: "Scheduled", 
            },
            {
                id: 2,
                title: "Notification 02",
                scheduleDate: "September 01, 2020",
                scheduleTime: "9:00 AM",
                status: "Sent", 
            }
        ]
    )
    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = notifs.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        )
        setNotifs(data);
    }

    const handleChange = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const data = notifs.map(obj => obj.id == row.id ? row : obj);
        setNotifs(data);
    }

    const handleRowActive = (row) => {
        handleForm(row, true);
        row.active = 'active';
        const data = notifs.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
            }
        );
        setNotifs(data);
    }

    return (
        <section className="component-body push-list notifs-table offers-table flex flex-col p-8">
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
                        notifs.map((notif, index) => 
                            <tr key={index} className={notif.active && 'non-active'} >
                                <td className="checkbox">
                                    <input type='checkbox' onChange={(e) => handleChange(notif,e.target.checked)} checked={notif.checked ? notif.checked : false} />
                                    <label></label>
                                </td>
                                <td className="title" onClick={() => handleRowActive(notif)}>
                                    <div className="title-img"></div>
                                    <p>
                                        {notif.title}
                                    </p>
                                </td>
                                <td>
                                    <p>{notif.scheduleDate}</p>
                                </td>
                                <td>
                                    <p>{notif.scheduleTime}</p>
                                </td>
                                <td>
                                    <button className={`btn-${notif.status == 'Scheduled' ? 'scheduled' : 'sent' }`}>
                                        {notif.status}
                                    </button>
                                </td>
                                <td className="actions">
                                    <span onClick={() => handleRowActive(notif)}>
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
    )
}
export default PushList;