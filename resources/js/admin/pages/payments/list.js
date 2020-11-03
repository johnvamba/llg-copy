import React from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import Mail from '../../../svg/mail';

const PaymentList = ({ showEdit, state, checkedAll, handleRowCheckbox, handleRowActive, isChecked }) => {

    return (
        <>
            <section className="payment-list users-table offers-table flex flex-col p-8">
                <table>
                    <thead className="">
                        <tr>
                            <th className="checkbox">
                                <input type='checkbox' onChange={checkedAll} checked={isChecked} />
                            </th>
                            <th>Need</th>
                            <th>Givers Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.data.map((payment, index) => 
                                <tr key={index} className={showEdit ? payment.active : 'non-active'} >
                                    <td className="checkbox">
                                        <input type='checkbox' onChange={(e) => handleRowCheckbox(payment,e.target.checked)} checked={payment.checked ? payment.checked : false} />
                                        <label></label>
                                    </td>
                                    <td className="title" onClick={() => handleRowActive(payment)}>
                                        <p>
                                            {payment.need}
                                        </p>
                                    </td>
                                    <td>
                                        <p>{payment.giversName}</p>
                                    </td>
                                    <td className="table-column-amount">
                                        <p>
                                            <span>$</span> 
                                            {payment.amount}
                                        </p>
                                    </td>
                                    <td>
                                        <p>{payment.date}</p>
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
export default PaymentList;