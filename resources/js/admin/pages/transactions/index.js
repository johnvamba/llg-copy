import React, { useState } from 'react';
import TransactionsHeader from './header';
import TransactionsList from './list';
import TransactionsForm from './form';

import './transactions.css';

const Transactions = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [organisations, setOrganisations] = useState(
        {
            data: [
                {
                    id: 1,
                    title: "Organisation 01",
                    giversName: "Jane Doe",
                    email: "janedoe@gmail.com",
                    phoneNumber: "(02) 9876 5432",
                    amount: "100.00",
                    date: "08/27/2020",
                },
                {
                    id: 2,
                    title: "Organisation 02",
                    giversName: "Jane Doe",
                    email: "janedoe@gmail.com",
                    phoneNumber: "(02) 9876 5432",
                    amount: "100.00",
                    date: "08/27/2020",
                },
                {
                    id: 3,
                    title: "Organisation 03",
                    giversName: "Jane Doe",
                    email: "janedoe@gmail.com",
                    phoneNumber: "(02) 9876 5432",
                    amount: "100.00",
                    date: "08/27/2020",
                },
                {
                    id: 4,
                    title: "Organisation 04",
                    giversName: "Jane Doe",
                    email: "janedoe@gmail.com",
                    phoneNumber: "(02) 9876 5432",
                    amount: "100.00",
                    date: "08/27/2020",
                },
                {
                    id: 5,
                    title: "Organisation 05",
                    giversName: "Jane Doe",
                    email: "janedoe@gmail.com",
                    phoneNumber: "(02) 9876 5432",
                    amount: "100.00",
                    date: "08/27/2020",
                },
                {
                    id: 6,
                    title: "Organisation 06",
                    giversName: "Jane Doe",
                    email: "janedoe@gmail.com",
                    phoneNumber: "(02) 9876 5432",
                    amount: "100.00",
                    date: "08/27/2020",
                },
            ]
        }
    )

    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = organisations.data.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        )
        setOrganisations({...organisations},{data : data});
    }

    const handleRowCheckbox = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const data = organisations.data.map(obj => obj.id == row.id ? row : obj);
        setOrganisations({...organisations},{data : data});
    }

    const handleRowActive = (row) => {
        if (showAdd) setShowAdd(false);
        setShowEdit(true);
        row.active = 'active';
        const data = organisations.data.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
            }
        );
        setOrganisations({...organisations},{data : data});
    }

    const handleCloseForm = () => {
        setShowAdd(false);
        setShowEdit(false);
    }

    return (
        <>
            <section>
                <TransactionsHeader closeForm={setShowAdd} />
                <TransactionsList
                    state={organisations}
                    checkedAll={checkedAll}
                    handleRowCheckbox={handleRowCheckbox}
                    handleRowActive={handleRowActive}
                    showEdit={showEdit}
                    isChecked={isChecked}
                />
                {
                    (showAdd || showEdit) &&
                        <TransactionsForm closeForm={handleCloseForm} activeForm={showAdd ? 'Add' : 'Edit'} />
                }
            </section>
        </>
    )
}

export default Transactions;