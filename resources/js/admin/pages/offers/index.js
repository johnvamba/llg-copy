import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as OffersAction from '../../../redux/offers/actions';
import OffersEmployment from '../../../svg/offers-employment';
import OffersPlus from '../../../svg/offers-plus';

//As test icon only
import OfferForm from './form';
import OfferView from './offer-view';
import OfferTable from './table'

const Offers = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [showView, setShowView] = useState(false);
    const [focus, setFocus] = useState({});

    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [offers, setOffers] = useState([])
    const [count, setCount] = useState(0);

    const loadTable = (clearCache = false) => {
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        setLoading(true)
        api.get(`/api/web/offers`, {
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
            const { offers_count } = data
            setOffers(data.data || [])
            setCount(offers_count || 0)
        }).finally(()=>{
            setLoading(false)
        })
        return token; //for useEffect
    }

    useEffect(() => {
        
        const ct = loadTable();
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, []);

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    const handleForm = (form = false, setting = null, data = null)=>{
        //change content of table here
        if(setting == 'submit'){
            //reload table
            loadTable(true)
            //or insert data here
        }
        setShowForm(form)
    }

    const showItem = (data, showView = true, showForm=false) => {
        setShowView(showView);
        setShowForm(showForm);
        setFocus(data);
        // console.log('show data?', showView, data)
    }

    return (
        <>
            <div className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>Offers { count > 0 ? `(${count})` : ''}</h1>
                </div>
                <button className="flex justify-end rounded-sm" onClick={()=>showItem({}, false, true)}>
                    <OffersPlus />
                    <span>Create Offer</span>
                </button>
            </div>
            
            <div className="component-body flex p-8">
                <OfferTable data={offers} showInfo={showItem} loading={loading}/>
            </div>
            {
                showForm && 
                <OfferForm setShowForm={setShowForm} data={focus} handleForm={handleForm}/>
            }
            {
                showView && 
                <OfferView data={focus} setShowOfferEdit={(e)=>showItem(focus, false, true)} />
            }
        </>
    )
}

export default Offers
