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
    const [counts, setCounts] = useState({
        published: 0,
        drafts: 0
    })

    const [publishes, setPublishes] = useState([])
    const [drafts, setDrafts] = useState([])

    const [focus, setFocus] = useState({});
    const [showCreateStory, setShowCreateStory] = useState(false);
    const [showViewStory, setShowViewStory] = useState(false);
    const [showEditStory, setShowEditStory] = useState(false);

    const location = useLocation();
    const windowWidth = window.innerWidth;

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadPublished = (clearCache = false) => {
        setLoading(true)
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        api.get(`/api/web/stories`, {
            params: {
                page, ...addFilter,
                type: 'published'
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            setPublishes(data.data || [])
            setCounts({
                ...counts,
                published: data.meta ? data.meta.total : 0
            })
            setLoading(false)
        }).finally(()=>{
        })
        return token; //for useEffect
    }
    const loadDrafts = (clearCache = false) => {
        setLoading(true)
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        api.get(`/api/web/stories`, {
            params: {
                page, ...addFilter,
                type: 'drafts'
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            setDrafts(data.data || [])
            setCounts({
                ...counts,
                drafts: data.meta ? data.meta.total : 0
            })
            setLoading(false)
        }).finally(()=>{
        })
        return token; //for useEffect
    }


    useEffect(()=>{
        const c = loadPublished()
        const d = loadDrafts()
        return ()=>{
            c.cancel('reset');
            d.cancel('reset');
        }
    }, [page, limit])

    // const stories = useSelector(
    //         state => state.StoriesReducer.stories
    //     )

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     async function fetchData() {
    //         let {data} = await axios.post('/api/story/lists', {
    //                 'limit': limit
    //             });

    //         dispatch(StoriesActions.setStories(data));
    //     }
    //     fetchData();
    // }, [limit])

    //disable scrolling if there is any modal/popup
    if (windowWidth < 1024) {
        useEffect(() => {
            ((showCreateStory || showViewStory || showEditStory) && windowWidth < 1024)
            ? document.body.style.overflow = 'hidden'
            : document.body.style.overflow = 'auto'; 
        }, [showCreateStory, showViewStory, showEditStory])
    }
    

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    const handleForm = (data = {}, openForm = false, openView = false)=>{
        setFocus(data)
        setShowCreateStory(openForm)
        setShowViewStory(openView)
    }

    const afterSubmit = (data = {}, type = 'draft') => {
        // console.log('afterSubmit',type,data)
        // switch(type){
        //     case 'draft':
        //     loadDrafts(true);
        //     break;
        //     case 'publish':
        //     loadPublished(true);
        //     default:
        // }
        loadDrafts(true);
        loadPublished(true);
        // if(type == 'draft'){
        //     loadDrafts(true)
        //     // setDrafts([data, ...drafts])
        //     // setCounts({
        //     //     ...counts,
        //     //     drafts: counts.drafts+1
        //     // })
        // } else {
        //     loadPublished(true)
        //     // setPublishes([data, ...publishes])
        //     // setCounts({
        //     //     ...counts,
        //     //     published: counts.published+1
        //     // })
        // }
    }

    return (
        <>
            <section className="stories">
                <StoriesHeader title={(location.pathname == "/stories") ? `Published (${counts.published || 0})` : `Draft (${counts.drafts || 0})`} setState={setShowCreateStory} />
                {
                    
                    <List set={(location.pathname == "/stories") ? publishes : drafts} handleForm={handleForm} />
                    // : <StoriesDrafts set={} setShowCreateStory={setShowCreateStory} />
                }
            </section>
            { showCreateStory && <StoriesForm data={focus} handleForm={handleForm} afterSubmit={afterSubmit} /> }
            { showViewStory && <View data={focus} handleForm={handleForm} afterSubmit={afterSubmit} /> }
        </>
    )
}

export default Stories;