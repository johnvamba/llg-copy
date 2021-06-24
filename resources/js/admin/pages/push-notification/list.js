import React, { useState, useEffect } from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';
import Paginator from '../../../components/Paginator';

const PushList = ({ data = [], setData = ()=>{}, setLimit, loading, meta, setPage, handleForm}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [approveElement, setApproveElement] = useState(null);
    const [rejectElement, setRejectElement] = useState(null);

    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const _data = data.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        )
        setData(_data);
    }

    const handleChange = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const _data = data.map(obj => obj.id == row.id ? row : obj);
        setData(_data);
    }

    const handleRowActive = (row) => {
        handleForm(row, true);
        row.active = 'active';
        const _data = data.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
            }
        );
        setData(_data);
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
                        data.map((notif, index) => 
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
                                    <p>{ notif.schedule_date }</p>
                                </td>
                                <td>
                                    <p>{ notif.schedule_time }</p>
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
                    {
                        data.length == 0 && <tr>
                            <td colSpan="6"> {loading ? "Loading..." : "No notifications"}</td>
                        </tr>
                    }
                </tbody>
            </table>
            <Paginator setLimit={setLimit} {...meta} clickedPage={setPage}/>

        </section>
    )
}
export default PushList;