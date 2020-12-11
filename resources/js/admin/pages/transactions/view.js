import React, { useState, useEffect } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import LoadingScreen from '../../../components/LoadingScreen'

const TransactionsView = ({ data = {}, handleForm }) => {
    const [loading, setLoad] = useState(false);
    const [state, loadState] = useState({});
    const [raised, setRaised] = useState(0);
    const [goal, setGoal] = useState(0);
    useEffect(()=>{
        let x = false;
        if(data.id) {
            setLoad(true)
            api.get(`/api/web/transacts/${data.id}`)
                .then(({data})=>{
                    if(!x && data.data){
                        loadState({...data.data})
                        setRaised(parseFloat(data.data.need_raised || 0).toFixed(2))
                        setGoal(parseFloat(data.data.need_goal || 0).toFixed(2))
                        setLoad(false)
                    }
                }).catch(()=>{

                })
        }
        return () => {
            x = true;
        }
    }, [data]);

    return(
        <section className="form transactions-form create-form">
            {
                (loading) &&
                <LoadingScreen title={
                    'Loading Transaction...'
                }/>
            }
            <header className="form-title create-story__header">
                <h3>View Transaction</h3>
                <button type="button" onClick={() => handleForm()}>
                    <OffersFormCross />
                </button>
            </header>
            <section className="form-body transaction-form__body">
                <form className="flex flex-wrap justify-between -mx-2">
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Transaction ID</label>
                            <p>{ data.id || 'Missing id'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Amount Sent</label>
                            <p className="font-bold"><span className="currency">$</span>{ data.amount || 'Missing amount'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Giver Name</label>
                            <p>{ data.giversName || 'Missing giver'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Email</label>
                            <p>{ data.email || 'Missing email'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Phone Number</label>
                            <p>{ data.phone_number || 'Missing phone'}</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                        <div className={`form-group`}>
                            <label>Date</label>
                            <p>{ data.date || 'Missing date'}</p>
                        </div>
                    </div>
                    {
                        state.id && 
                        <div className="w-full px-2">
                            <div className={`form-group`}>
                                <label>Need Details</label> 
                                <div className="card-details">
                                    <div className="flex mb-1">
                                        <div className="flex-grow-1">
                                            <h4 className="card-title">{data.need_title || 'missing-title'}</h4>
                                            <h5 className="card-subtitle">
                                                <span className="photo" style={{backgroundImage: `url(${state.org_photo})`}}/>
                                                {data.org_name || 'missing-org'}
                                            </h5>
                                        </div>
                                        <img className="need-image" style={{backgroundImage: `url(${state.need_photo})`}}/>
                                    </div>
                                    <label className="about mb-1">About</label>
                                    <p className="details">{state.need_desc}</p>
                                    <div className="progress mb-1">
                                        <div className="progress-bar" style={{width: `${raised /(goal != 0 ? goal : 1)}%`}}></div>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="raised">Raised: $ {raised}</p>
                                        <p>Goal: $ {goal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </form>
            </section>
        </section>
    )
}

export default TransactionsView