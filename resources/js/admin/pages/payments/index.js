import React, { useState, useEffect } from 'react';
import PaymentHeader from './header';
import PaymentList from './list';
import PaymentTable from './table';
import PaymentForm from './form';
import PaymentView from './view';


import './payments.css';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [paymentList, setPaymentList] = useState([]);
    const [count, setCount] = useState(0)
    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [focus, setFocus] = useState({});

    useEffect(()=>{
        setLoading(false)
        loadPayments()
    }, [page])


    const loadPayments = (clearCache = false)=>{
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        if(!loading){
            api.get(`/api/web/payments`, {
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
                setPaymentList(data.data)
                setCount(data.meta ? data.meta.total : 0)
            }).finally(()=>{
                setLoading(false)
            })
        }
        return token; //for useEffect
    }

    const handleForm = (data = {}, showInfo = false, showForm = false) => {
        setFocus(data)
        setShowInfo(showInfo)
        setShowForm(showForm)
    }

    return(
        <section>
            <PaymentHeader count={count} setShowAdd={()=> handleForm({}, false, true)} />
            <div className="component-body flex p-8">
                <PaymentTable
                    data={paymentList}
                    loading={loading}
                    handleForm={handleForm}
                />
            </div>
            {
                showInfo && <PaymentView data={focus} handleForm={handleForm} />
            }
            {
                //showForm && <PaymentForm closeForm={handleForm} />
            }
        </section>
    )
}


export default Payment;