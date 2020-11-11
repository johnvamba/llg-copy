import React, { useState, useEffect } from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';

const UsersList = ({ setShowEditUser }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [users, setUsers] = useState(
        {
            columns : [
                "id",
                "title",
                "email",
                "age",
                "bio",
                "date-added",
            ],
            data: [
                [
                    {
                        id: 1,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020"
                    },
                    {
                        id: 2,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020"
                    },
                    {
                        id: 3,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020"
                    },
                    {
                        id: 4,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020"
                    },
                    {
                        id: 5,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020"
                    },
                    {
                        id: 6,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020"
                    }
                ]
            ]
        }
    )
    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = users.data.map((user, index) => 
            user.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        ))
        setUsers({...users},{data : data});
    }

    const handleChange = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const data = users.data.map((user, index) => 
            user.map(obj => obj.id == row.id ? row : obj)
        );
        setUsers({...users},{data : data});
    }

    const handleRowActive = (row) => {
        setShowEditUser(true);
        row.active = 'active';
        const data = users.data.map((user, index) => 
            user.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
                
            })
        );
        setUsers({...users},{data : data});
    }

    return (
        <>
            <section className="users-table offers-table flex flex-col p-8">
                <table>
                    <thead className="">
                        <tr>
                            <th className="checkbox">
                                <input type='checkbox' onChange={checkedAll} checked={isChecked} />
                            </th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Bio</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.data.map((user, index) => 
                                user.map((obj, key) =>
                                    <tr key={key} className={obj.active} >
                                        <td className="checkbox">
                                            <input type='checkbox' onChange={(e) => handleChange(obj,e.target.checked)} checked={obj.checked ? obj.checked : false} />
                                            <label></label>
                                        </td>
                                        <td className="title" onClick={() => handleRowActive(obj)}>
                                            <div className="title-img"></div>
                                            <p>
                                                {obj.title}
                                            </p>
                                        </td>
                                        <td>
                                            <p>{obj.email}</p>
                                        </td>
                                        <td>
                                            <p>{obj.age}</p>
                                        </td>
                                        <td>
                                            <p>{obj.bio}</p>
                                        </td>
                                        <td>
                                            <p>{obj.dateAdded}</p>
                                        </td>
                                        <td className="actions">
                                            <span onClick={() => handleRowActive(obj)}>
                                                <UsersActionsEdit />
                                            </span>
                                            <span>
                                                <UsersActionsDelete />
                                            </span>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}
export default UsersList;