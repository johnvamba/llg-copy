import React, { useState, useEffect } from 'react';
import TransactionsHeader from './header';
import TransactionsTable from './table';
import TransactionsView from './view';
import Paginator from '../../../components/Paginator';

import './transactions.css';

const Transactions = () => {
    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [focus, setFocus] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState( [ ] )
    useEffect(() => {
        loadTransactions()
    }, [page, limit])

    const loadTransactions = (clearCache = false)=>{
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        setLoading(true)
        if(!loading){
            api.get(`/api/web/transacts`, {
                params: {
                    page, ...addFilter,
                    per_page: limit
                },
                cache: {
                    exclude: { query: false },
                }, 
                clearCacheEntry: clearCache,
                cancelToken: token.token
            }).then((res)=>{
                const { data } = res
                setTransactions(data.data)
                setMeta(data.meta)
            }).finally(()=>{
                setLoading(false)
            })
        }
        return token; //for useEffect
    }

    const handleForm = (data = {}, showInfo, showForm = false) => {
        setFocus(data)
        setShowInfo(showInfo)
        setShowForm(showForm)
    }

    const afterSubmit = () => {
        setLoading(true)
        loadTransactions(true)
    }

    return (
        <section>
            <TransactionsHeader handleForm={handleForm} />
            <div className="component-body flex flex-col p-8">
                {
                    loading && ''
                }
                <TransactionsTable
                    data={transactions}
                    set={transactions}
                    loading={loading}
                    handleForm={handleForm}
                />
                <Paginator setLimit={setLimit} {...meta} clickedPage={setPage}/>
            </div>
            {
                showInfo &&
                <TransactionsView data={focus} handleForm={handleForm}/>
            }
        </section>
    )
}

export default Transactions;