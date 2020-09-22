import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as StoriesActions from '../../../redux/stories/actions';
import DataTable from '../../../components/layout/DataTable';

const Stories = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const stories = useSelector(
            state => state.StoriesReducer.stories
        )

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let {data} = await axios.post('/api/story/lists', {
                    'limit': limit
                });

            dispatch(StoriesActions.setStories(data));
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
                    <li className="font-thin">Stories</li>
                    <li><span className="mx-2">/</span></li>
                    <li><a href="#" className="text-blue-400 font-semibold">Contents</a></li>
                </ol>
            </div>
            <div className="flex flex-col p-12">
                <DataTable
                    module={stories.module}
                    records={stories}
                    changeLimit={handleLimitChange}
                    currentPage={page}
                    changePage={handleChangePage}
                    canAdd={false}
                />
            </div>
        </>
    )
}

export default Stories;