import React, { useState } from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import Mail from '../../../svg/mail';

const TransactionsList = ({ showEdit, set = [], checkedAll, handleRowCheckbox, handleForm, isChecked }) => {

    return (
        <section className="transaction-list users-table offers-table flex flex-col p-8">
            <table>
                <thead className="">
                    <tr>
                        <th className="checkbox">
                            <input type='checkbox' onChange={checkedAll} checked={isChecked} />
                        </th>
                        <th>Organisation</th>
                        <th>Givers Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        set.map((organisation, index) => 
                            <tr key={index} className={showEdit ? organisation.active : 'non-active'} >
                                <td className="checkbox">
                                    <input type='checkbox' onChange={(e) => handleRowCheckbox(organisation,e.target.checked)} checked={organisation.checked ? organisation.checked : false} />
                                    <label></label>
                                </td>
                                <td className="title" onClick={() => handleForm(organisation, true)}>
                                    <p>
                                        {organisation.title}
                                    </p>
                                </td>
                                <td>
                                    <p>{organisation.giversName}</p>
                                </td>
                                <td>
                                    <p>{organisation.email}</p>
                                </td>
                                <td>
                                    <p>{organisation.phoneNumber}</p>
                                </td>
                                <td>
                                    <p>
                                        <span>$</span> 
                                        {organisation.amount}
                                    </p>
                                </td>
                                <td>
                                    <p>{organisation.date}</p>
                                </td>
                                <td className="actions">
                                    <span>
                                        <Mail />
                                    </span>
                                    <span onClick={() => handleForm(organisation, true)}>
                                        <UsersActionsEdit />
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
export default TransactionsList;