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
    const [transactions, setTransactions] = useState( [ ] )
    useEffect(() => {
        setLoading(true)
        loadTransactions()
    }, [page])

    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = transactions.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        )
        setTransactions(data);
    }

    const handleRowCheckbox = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const data = transactions.map(obj => obj.id == row.id ? row : obj);
        setTransactions(data);
    }

    const handleRowActive = (row) => {
        if (showAdd) setShowAdd(false);
        setShowEdit(true);
        row.active = 'active';
        const data = transactions.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
            }
        );
        setTransactions(data);
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
                setTransactions(data.data)
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
                set={transactions}
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