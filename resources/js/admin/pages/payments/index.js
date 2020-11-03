import React, {useState} from 'react';
import PaymentHeader from './header';
import PaymentList from './list';
import PaymentForm from './form';

import './payments.css';


const Payment = () => {

    const [showAdd, setShowAdd] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [paymentList, setPaymentList] = useState(
        {
            data: [
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
                },
                {
                    id: 3,
                    need: "Sample Title Here",
                    giversName: "Jane Doe",
                    amount: "100.00",
                    date: "08/27/2020",
                },
                {
                    id: 4,
                    need: "Sample Title Here",
                    giversName: "Jane Doe",
                    amount: "100.00",
                    date: "08/27/2020",
                },
                {
                    id: 5,
                    need: "Sample Title Here",
                    giversName: "Jane Doe",
                    amount: "100.00",
                    date: "08/27/2020",
                },
                {
                    id: 6,
                    need: "Sample Title Here",
                    giversName: "Jane Doe",
                    amount: "100.00",
                    date: "08/27/2020",
                },
            ]
        }
    )

    const checkedAll = (e) => {
        setIsChecked(!isChecked);
        const data = paymentList.data.map(obj => {
                obj.checked = !isChecked;
                return obj;
            }
        )
        setPaymentList({...paymentList},{data : data});
    }

    const handleRowCheckbox = (row,input) => {
        setIsChecked(false);
        row.checked = input;
        const data = paymentList.data.map(obj => obj.id == row.id ? row : obj);
        setPaymentList({...paymentList},{data : data});
    }

    const handleRowActive = (row) => {
        if (showAdd) setShowAdd(false);
        setShowEdit(true);
        row.active = 'active';
        const data = paymentList.data.map(obj => {
                if(obj.id == row.id) return row;
                else{
                    obj.active = 'non-active'
                    return obj;
                }
            }
        );
        setPaymentList({...paymentList},{data : data});
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