import React, { useState } from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';


const PushList = ({ showEdit, handleForm}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [approveElement, setApproveElement] = useState(null);
    const [rejectElement, setRejectElement] = useState(null);

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

    const switchStatus=(status)=>{
        switch(status){
            case 'scheduled':
            case 'Scheduled':
            return <span className="label label-scheduled">Scheduled</span>;
            case 'sent':
            case 'Sent':
            return <span className="label label-sent">Sent</span>;
            default:
            return <span className="label label-secondary">Unknown</span>;
        }
    }

    return (
        <section className="component-body push-list notifs-table offers-table flex flex-col p-8">
            <table className="table">
                <thead className="bg-white tb-head">
                    <tr>
                        <th className="checkbox">
                            <input type='checkbox' onChange={checkedAll} checked={isChecked}/>
                        </th>
                        <th className="title">Title</th>
                        <th>Schedule Date</th>
                        <th>Schedule Time</th>
                        <th>Status</th>
                        <th className="actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    notifs.map((notif, index) => 
                        <tr key={index}>
                            <td className="checkbox">
                                <input type='checkbox' onChange={(e) => handleChange(notif,e.target.checked)} checked={notif.checked ? notif.checked : false} />
                            </td>
                            <td className="title" onClick={() => handleRowActive(notif)}>
                                <div className="flex">
                                    <img className="title-img circle" src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" />
                                    <p>
                                        { notif.title }
                                    </p>
                                </div>
                            </td>
                            <td>
                                <p>{ notif.scheduleDate }</p>
                            </td>
                            <td>
                                <p>{ notif.scheduleTime }</p>
                            </td>
                            <td>
                                { switchStatus(notif.status) }
                            </td>
                            <td>
                                <div className="actions row-actions">
                                    
                                <button onClick={() => handleRowActive(notif)}>
                                    <i ref={setApproveElement}>
                                    <UsersActionsEdit />
                                    </i>
                                </button>
                                <button onClick={()=>popAction(rejectElement, 'remove')}>
                                    <i ref={setRejectElement}>
                                    <UsersActionsDelete />
                                    </i>
                                </button>
                                </div>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            {/* <table>
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
            </table> */}
        </section>
    )
}
export default PushList;