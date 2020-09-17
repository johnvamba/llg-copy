import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as OffersAction from '../../../redux/offers/actions';
import DataTable from '../../../components/layout/DataTable';

const Offers = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const offers = useSelector(
            state => state.OffersReducer.offers
        )

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let {data} = await axios.post('/api/offer/lists', {
                    'limit': limit
                });

            console.log(data);

            dispatch(OffersAction.setOffers(data))
        }

        fetchData();
    }, [limit]);
    
    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    return (
        <div className="flex flex-col p-12">
            <DataTable
                module={offers.module}
                records={offers}
                changeLimit={handleLimitChange}
                currentPage={page}
                changePage={handleChangePage}
                canAdd={false}
            />
        </div>
    )
}

export default Offers