import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as OffersAction from '../../../redux/offers/actions';
import OffersEmployment from '../../../svg/offers-employment';
import OffersPlus from '../../../svg/offers-plus';
import Paginator from '../../../components/Paginator';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';
import Swal from 'sweetalert2';
//As test icon only
import OfferForm from './form';
import OfferView from './offer-view';
import OfferTable from './table'

const OfferRequests = () => {
    const dispatch = useDispatch();
    const search = useSelector(({SearchReducer}) => SearchReducer.search);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [meta, setMeta] = useState({})
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
                page, ...addFilter,
                status: 'pending',
                per_page: limit,
                search
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
            setCount(data.meta ? data.meta.total : 0)
            setMeta(data.meta)
            setLoading(false)
        }).finally(()=>{
        })
        return token; //for useEffect
    }

    useEffect(() => {
        
        const ct = loadTable();
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, [page, limit, search]);

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    const handleForm = (form = false, setting = null, data = {})=>{
        //change content of table here
        if(setting == 'submit'){
            //reload table
            loadTable(true)
            //or insert data here
        }
        setShowForm(form)
        setFocus(data)
    }

    const showItem = (data, showView = true, showForm=false) => {
        setShowView(showView);
        setShowForm(showForm);
        setFocus(data);
        // console.log('show data?', showView, data)
    }

     const remove = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You will delete this offer ${item.title}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                setFocus({});
                setShowView(false);
                setShowForm(false);
                // handleForm();
                api.delete(`/api/web/offers/${item.id}`)
                .then(()=>{
                    loadTable(true);
                    swalSuccess('Offer has been deleted');
                }).catch(()=>{
                    swalError("There's has been an error on deleting Offer");
                })
            }
        })
    }

    return (
        <>
            <div className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>Offers { count > 0 ? `(${count})` : ''}</h1>
                </div>
                <button className="primary-btn flex justify-end rounded-sm" onClick={()=>showItem({}, false, true)}>
                    <OffersPlus />
                    <span>Create Offer</span>
                </button>
            </div>
            
            <div className="component-body flex flex-col p-8">
                <OfferTable data={offers} showInfo={showItem} loading={loading} loadTable={loadTable} type="pending"/>
                <Paginator setLimit={setLimit} {...meta} clickedPage={setPage}/>
            </div>
            {
                showForm && 
                <OfferForm setShowForm={setShowForm} data={focus} handleForm={handleForm}/>
            }
            {
                showView && 
                <OfferView data={focus} setShowOfferEdit={(e)=>showItem(focus, false, true)} remove={()=>remove(focus)} toClose={()=>showItem({}, false)}/>
            }
        </>
    )
}

export default OfferRequests
