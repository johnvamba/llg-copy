import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom'
import * as StoriesActions from '../../../redux/stories/actions';
import List from './list';
import OffersPlus from '../../../svg/offers-plus';
import CreateStory from './create';
import StoriesForm from './form';
import EditStory from './edit';
import View from './view';
import StoriesHeader from './header';
import StoriesDrafts from './drafts';

import './story.css';

const Stories = () => {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [showCreateStory, setShowCreateStory] = useState(false);
    const [showViewStory, setShowViewStory] = useState(false);
    const [showEditStory, setShowEditStory] = useState(false);

    const location = useLocation();
    console.log(location.pathname);

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
                <StoriesHeader title={(location.pathname == "/stories") ? 'Published (9)' : 'Drafts (0)'} setState={setShowCreateStory} />
                {
                    (location.pathname == "/stories")
                    ? <List setShowViewStory={setShowViewStory} />
                    : <StoriesDrafts />
                }
            </section>
            
            { showCreateStory && <StoriesForm state='create' setState={setShowCreateStory} setShowViewStory={setShowViewStory} /> }
            { showViewStory && <View setShowEditStory={setShowEditStory} /> }
            { showEditStory && <StoriesForm state='edit' setState={setShowEditStory} setShowViewStory={setShowViewStory} /> }

        </>
    )
}

export default Stories;