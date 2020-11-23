import React, { useState, useEffect } from 'react';
import TransactionsHeader from './header';
import TransactionsList from './list';
import TransactionsForm from './form';

import './transactions.css';

const Transactions = () => {
    const [showForm, setShowForm] = useState(false);
    const [focus, setFocus] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [organisations, setOrganisations] = useState(
        [
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            },{
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
            }
        ]
    )
    useEffect(() => {
        setLoading(true)
        // loadTransactions()
    }, [page])

    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = organisations.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        )
        setOrganisations(data);
    }

    const handleRowCheckbox = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const data = organisations.map(obj => obj.id == row.id ? row : obj);
        setOrganisations(data);
    }

    const handleRowActive = (row) => {
        if (showAdd) setShowAdd(false);
        setShowEdit(true);
        row.active = 'active';
        const data = organisations.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
            }
        );
        setOrganisations(data);
    }

    const loadTransactions = (clearCache = false)=>{
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        if(!loading){
            api.get(`/api/web/transacts`, {
                params: {
                    page, ...addFilter
                },
                cache: {
                    exclude: { query: false },
                }, 
                clearCacheEntry: clearCache,
                cancelToken: token.token
            }).then((res)=>{
                const { data } = res
                setOrganisations(data.data)
            }).finally(()=>{
                setLoading(false)
            })
        }
        return token; //for useEffect
    }

    const handleForm = (data = {}, showForm = false) => {
        setFocus(data)
        setShowForm(showForm)
    }

    const afterSubmit = () => {
        setLoading(true)
        loadTransactions(true)
    }

    return (
        <section>
            <TransactionsHeader handleForm={handleForm} />
            <TransactionsList
                set={organisations}
                checkedAll={checkedAll}
                handleRowCheckbox={handleRowCheckbox}
                handleRowActive={handleRowActive}
                isChecked={isChecked}
                handleForm={handleForm}
            />
            {
                showForm &&
                <TransactionsForm data={focus} afterSubmit={afterSubmit} handleForm={handleForm}/>
            }
        </section>
    )
}

export default Transactions;