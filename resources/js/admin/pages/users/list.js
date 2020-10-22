import React, { useState } from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';

const UsersList = ({ setShowEditUser }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [offers, setOffers] = useState(
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
                        dateAdded: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 2,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 3,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 4,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 5,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020",
                        checked: false
                    },
                    {
                        id: 6,
                        title: "Jane Doe",
                        email: "janedoe@gmail.com",
                        age: "24",
                        bio: "test.", 
                        dateAdded: "08/27/2020",
                        checked: false
                    }
                ]
            ]
        }
    )
    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = offers.data.map((offer, index) => 
            offer.map(obj => ({ ...obj, checked: !isChecked })
        ))
        setOffers({data : data});
    }

    const handleChange = (id) => {
        setIsChecked(false);
        const data = offers.data.map((offer, index) => 
            offer.map(obj => {
                if (obj.id == id) return { ...obj, checked: !obj.checked }
                else return { ...obj }
            }
        ));
        setOffers({data : data});
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
                            offers.data.map((offer, index) => 
                                offer.map((obj, key) =>
                                    <tr key={key} >
                                        <td className="checkbox">
                                            <input type='checkbox' onChange={() => handleChange(obj.id)} checked={obj.checked} />
                                            <label></label>
                                        </td>
                                        <td className="title">
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
                                            <span onClick={() => setShowEditUser(true)}>
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