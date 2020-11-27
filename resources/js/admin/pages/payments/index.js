import React, { useState, useEffect } from 'react';
import PaymentHeader from './header';
import PaymentList from './list';
import PaymentForm from './form';

import './payments.css';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [paymentList, setPaymentList] = useState([
        {
            id: 1,
            need: "Sample Title Here",
            giversName: "Jane Doe",
            amount: "25.00",
            date: "08/27/2020",
        },
        {
            id: 2,
            need: "Sample Title Here",
            giversName: "Jane Doe",
            amount: "2,500.00",
            date: "08/27/2020",
        }
    ]);

    useEffect(()=>{
        setLoading(false)
        loadPayments()
    }, [page])

    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = paymentList.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        )
        setPaymentList(data);
    }

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
            }).finally(()=>{
                setLoading(false)
            })
        }
        return token; //for useEffect
    }

    const handleRowCheckbox = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const data = paymentList.map(obj => obj.id == row.id ? row : obj);
        setPaymentList(data);
    }

    const handleRowActive = (row) => {
        if (showAdd) setShowAdd(false);
        setShowEdit(true);
        row.active = 'active';
        const data = paymentList.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
            }
        );
        setPaymentList(data);
    }

    const handleCloseForm = () => {
        setShowAdd(false);
        setShowEdit(false);
    }

    return(
        <>
            <section>
                <PaymentHeader setShowAdd={setShowAdd} />
                <PaymentList
                    state={paymentList}
                    checkedAll={checkedAll}
                    handleRowCheckbox={handleRowCheckbox}
                    handleRowActive={handleRowActive}
                    showEdit={showEdit}
                    isChecked={isChecked}
                />
                {
                    showAdd && <PaymentForm closeForm={handleCloseForm} />
                }
            </section>
        </>
    )
}


export default Payment;