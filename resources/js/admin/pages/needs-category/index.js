import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as NeedsCategoriesActions from '../../../redux/needs-categories/actions';
import DataTable from '../../../components/layout/DataTable';

const NeedsCategory = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const categories = useSelector(
        state => state.NeedsCategoriesReducer.categories
    )

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let {data} = await axios.post('/api/needs-category/lists', {
                    'limit': limit
                });

            dispatch(NeedsCategoriesActions.setCategories(data));
        }

        fetchData();
    }, [limit])

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    return (
        <>
            <div className="h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <ol className="list-reset flex text-grey-dark text-base">
                    <li className="font-thin">Needs</li>
                    <li><span className="mx-2">/</span></li>
                    <li className="font-thin">Contents</li>
                    <li><span className="mx-2">/</span></li>
                    <li><a href="#" className="text-blue-400 font-semibold">Categories</a></li>
                </ol>
            </div>
            <div className="flex flex-col p-12">
                <DataTable
                    module={categories.module}
                    records={categories}
                    changeLimit={handleLimitChange}
                    currentPage={page}
                    changePage={handleChangePage}
                />
            </div>
        </>
    )
}

export default NeedsCategory;