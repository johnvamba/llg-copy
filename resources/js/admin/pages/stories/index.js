import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as StoriesActions from '../../../redux/stories/actions';
import List from './list';
import OffersPlus from '../../../svg/offers-plus';
import CreateStory from './create';
import StoriesForm from './form';
import EditStory from './edit';
import View from './view';

import './story.css';

const Stories = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [showCreateStory, setShowCreateStory] = useState(false);
    const [showViewStory, setShowViewStory] = useState(false);
    const [showEditStory, setShowEditStory] = useState(false);

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
            <section className="stories">
                <section className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                    <div className="flex flex-1">
                        <h1>Published (8)</h1>
                    </div>
                    <div className="flex flex-1 justify-end">
                        <button className="flex rounded-sm" onClick={() => setShowCreateStory(true)}>
                            <OffersPlus />
                            <span>Create Story</span>
                        </button>
                    </div>
                </section>
                <section className="stories__list">
                    <List setShowViewStory={setShowViewStory} />
                </section>
            </section>
            
            { showCreateStory && <StoriesForm state='create' setState={setShowCreateStory} setShowViewStory={setShowViewStory} /> }
            { showViewStory && <View setShowEditStory={setShowEditStory} /> }
            { showEditStory && <StoriesForm state='edit' setState={setShowEditStory} setShowViewStory={setShowViewStory} /> }

        </>
    )
}

export default Stories;