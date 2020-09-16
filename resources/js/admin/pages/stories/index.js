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
        <div className="flex flex-col">
            <DataTable
                module={stories.module}
                records={stories}
                changeLimit={handleLimitChange}
                currentPage={page}
                changePage={handleChangePage}
                canAdd={false}
            />
        </div>
    )
}

export default Stories;