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
import ManageComment from './comments';
import StoriesHeader from './header';
import LoadingScreen from '../../../components/LoadingScreen'
import { setOrg, setNeedId } from '../../../redux/stories/actions';

import './story.css';

const Stories = () => {
    const [page, setPage] = useState(1);
    const [edited, setEdited] = useState(false);
    const [counts, setCounts] = useState({
        published: 0,
        drafts: 0,
        submissions: 0
    })
    const roles = useSelector(({AuthUserReducer}) => AuthUserReducer.roles);
    const [storyData, setStoryData] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 0,
        }
    })

    const [publishes, setPublishes] = useState([])
    const [submissions, setSubs] = useState([])
    const [drafts, setDrafts] = useState([])

    const [focus, setFocus] = useState({});
    const [showCreateStory, setShowCreateStory] = useState(false);
    const [showViewStory, setShowViewStory] = useState(false);
    const [showEditStory, setShowEditStory] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const location = useLocation();
    const windowWidth = window.innerWidth;

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const search = useSelector(({SearchReducer}) => SearchReducer.search);
    const dispatch = useDispatch();

    const getType = ()=>{
        switch(location.pathname){
            case '/stories/submissions':
            return 'submissions';
            case '/stories/drafts':
            return 'drafts';
            default:
            return;
        }
    }

    const apiLoad = (options = {})=>{
        return api.get(`/api/web/stories`, options)
    }

    const getTitle = ()=>{
        const count = storyData.meta.total;
        if(location.pathname == '/stories' && roles.name == 'organization admin')
            return `Submissions (${count})`;

        switch(location.pathname){
            case '/stories/submissions':
            return `Submissions (${count})`;
            case '/stories/drafts':
            return `Drafts (${count})`;
            case '/stories':
            return `Published (${count})`;
            default:
            return `Stories (${count})`;
        }
    }

    const loadStories = (clearCache = false, type = null, firstPage = null) => {
        setLoading(true)
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        apiLoad({
            params: {
                page: firstPage || page || 1, 
                ...addFilter,
                type: type || getType(),
                search
            },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then((res)=>{
            const { data } = res
            const { meta } = data
            setStoryData({ 
                ...storyData,
                data: data.data,
                meta: meta
            })
            setPage(meta.current_page || 1);
            setLoading(false)
        }).finally(()=>{
        })
        return token; //for useEffect
    }

    useEffect(()=>{
        //redux defaults
        loadStories(edited);
        dispatch( setNeedId(null) )
        dispatch( setOrg(null) )
        if(edited)
            setEdited(false)
    }, [location])

    useEffect(() => {
        const ct = loadStories(true, null, 1)
        return ()=>{
            //cancel api here
            ct.cancel('Resetting');
        }
    }, [search])

    //disable scrolling if there is any modal/popup
    if (windowWidth < 1024) {
        useEffect(() => {
            ((showCreateStory || showViewStory || showEditStory) && windowWidth < 1024)
            ? document.body.style.overflow = 'hidden'
            : document.body.style.overflow = 'auto'; 
        }, [showCreateStory, showViewStory, showEditStory])
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }

    const handleForm = (data = {}, openForm = false, openView = false, showComments = false)=>{
        setFocus(data)
        setShowCreateStory(openForm)
        setShowViewStory(openView)
        setShowComments(showComments)
    }

    const afterSubmit = (data = {}, type = 'draft') => {
        loadStories(true)
        // switch(type) {
        //     case 'publish':
        //     break;
        //     case 'submit':
        //     break;
        //     case 'draft':
        //     break;
        //     case 'unpublished':
        //     break;
        //     case 'published':
        //     break;
        //     default:
        //     break;
        // }
        setEdited(true);
    }

    return (
        <>
            <section className="stories">
                <StoriesHeader title={getTitle()} setState={setShowCreateStory} />
                {
                    loading ? <LoadingScreen title={'Loading Stories'}/> :
                    <List set={storyData.data || []} handleForm={handleForm} />
                }
            </section>
            { showCreateStory && <StoriesForm data={focus} handleForm={handleForm} afterSubmit={afterSubmit} /> }
            { showViewStory && <View data={focus} handleForm={handleForm} afterSubmit={afterSubmit} /> }
            { showComments && <ManageComment data={focus} handleForm={handleForm} /> } 
        </>
    )

}

export default Stories;