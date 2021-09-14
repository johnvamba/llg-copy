import React, { useState, useEffect } from 'react';
import LoadingScreen from '../../../components/LoadingScreen'
import { swalDelete2, swalSuccess } from '../../../components/helpers/alerts';
import { useSelector } from 'react-redux';
import CommentItem from './comment-item';
import { usePopper } from 'react-popper';

const ManageComment = ({data = {}, count = 0, handleForm }) => {
    const { title } = data
    const [loading, setLoading] = useState(null);
    const [comments, setComments] = useState([]);
    const [meta, setMeta] = useState({
        current_page: 1,
    });
    //popper
    const [filterElement, setFilterElement] = useState(null);
    const [toggleFilter, showFilter] = useState(false);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [item, setItem] = useState({});
    const {styles, attributes} = usePopper(filterElement, popperElement, {
        placement: 'bottom-start',
        className: 'arror',
        modifiers: [{name: 'arrow', options: {element: arrowElement } }],
    })

    const roles = useSelector(({AuthUserReducer}) => AuthUserReducer.roles)

    useEffect(()=>{
        if(data.id){
            loadComments(true)
        }
    }, [data])

    const loadComments = (cacheClear = false) => {
        setLoading("Loading comments...")
        api.get(`/api/web/stories/${data.id}/comments`)
            .then(({data})=>{
                setComments(data.data);
                setLoading(null);
            })
    }

    const deleting = () => {
        if(data.id && item.comment_id) {
            swalDelete2("comment")
            .then((result)=> {
                if(result.value) {
                    setLoading('Deleting Comment...')
                    api.delete(`/api/web/stories/${data.id}/comments/${item.comment_id}`)
                    .then(()=>{
                        swalSuccess('Comment Removed.')
                        setComments(comments.filter(i => item.comment_id !== i.comment_id ))
                    }).finally(()=>{
                        setLoading(null)
                    }).catch(()=>{

                    })
                }
            })
        }
    }

    const toggleHidden = () => {
        if(data.id && item.comment_id) {
            console.log('loading here')
            setLoading(!item.is_hidden ? 'Hiding comment...' : 'Unhiding comment...')
            api.post(`/api/web/stories/${data.id}/comments/${item.comment_id}`, {
                    hide: !item.is_hidden
                }).then(({data})=>{
                    const { comment } = data;
                    setLoading(null);
                    swalSuccess(comment.is_hidden ? 'Comment Hid' : 'Comment Showed')
                    setComments(comments.map(i => i.comment_id === comment.comment_id ? comment : i ))
                }).finally(()=>{
                    setLoading(null)
                })
            }
    }

    const onClicked = (element, item = {}) => {
        setFilterElement(element)
        setItem(item)
        showFilter(element ? true : false);
    }

    if (loading)
        return (<section className="view-story-comments">
            <LoadingScreen title={ loading || 'Please wait' }/>
        </section>)
            
    return (
        <section className="view-story-comments">
            <div className="comment-header">
                <i onClick={()=>handleForm(data, false, true)} className="fas fa-chevron-left"></i>
                <label className="ml-3 flex items-center">
                    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5631 14.2341L10.133 13.6197L10.5631 14.2341ZM5.2737 17.9367L4.8436 17.3223L5.2737 17.9367ZM1.75 4.00147C1.75 2.75882 2.75736 1.75146 4 1.75146V0.251465C1.92893 0.251465 0.25 1.9304 0.25 4.00147H1.75ZM1.75 11.1979V4.00147H0.25V11.1979H1.75ZM4 13.4479C2.75736 13.4479 1.75 12.4406 1.75 11.1979H0.25C0.25 13.269 1.92894 14.9479 4 14.9479V13.4479ZM4.759 13.4479H4V14.9479H4.759V13.4479ZM5.709 17.7728V14.3979H4.209V17.7728H5.709ZM10.133 13.6197L4.8436 17.3223L5.70379 18.5511L10.9932 14.8485L10.133 13.6197ZM16.4751 13.4479H10.6778V14.9479H16.4751V13.4479ZM18.7251 11.1979C18.7251 12.4406 17.7177 13.4479 16.4751 13.4479V14.9479C18.5461 14.9479 20.2251 13.269 20.2251 11.1979H18.7251ZM18.7251 4.00146V11.1979H20.2251V4.00146H18.7251ZM16.4751 1.75146C17.7177 1.75146 18.7251 2.75883 18.7251 4.00146H20.2251C20.2251 1.9304 18.5461 0.251465 16.4751 0.251465V1.75146ZM4 1.75146H16.4751V0.251465H4V1.75146ZM10.9932 14.8485C10.9008 14.9132 10.7907 14.9479 10.6778 14.9479V13.4479C10.4829 13.4479 10.2927 13.5079 10.133 13.6197L10.9932 14.8485ZM4.209 17.7728C4.209 18.5414 5.07415 18.9919 5.70379 18.5511L4.8436 17.3223C5.20813 17.0671 5.709 17.3279 5.709 17.7728H4.209ZM4.759 14.9479C4.45525 14.9479 4.209 14.7017 4.209 14.3979H5.709C5.709 13.8733 5.28367 13.4479 4.759 13.4479V14.9479Z" fill="#98999B"/>
                    </svg>
                    {data.appreciates_count || 0} Comments
                </label>
            </div>
            <div className="comment-body">
            {
                comments.length > 0 && comments.map((comment)=> <CommentItem key={'c_'+comment.comment_id} comment={comment} onClicked={onClicked} />)
            }
            {
                toggleFilter && <div ref={setPopperElement} 
                    className="filter-content" 
                    style={{...styles.popper, top:'0px', zIndex: 1}} 
                    {...attributes.popper}>
                    <div ref={setArrowElement} className='dbfilter-arrow' style={{...styles.arrow}} />
                    {
                        (loading && item) ? 
                        <div className="comment-buttons">Loading...</div> :
                        <div className="comment-buttons">
                            <button onClick={toggleHidden} disabled={loading}>{ item.is_hidden ? "Show" : "Hide" }</button>
                            <button onClick={deleting} disabled={loading} >Delete</button>
                        </div>
                    }
                </div>
            }
            </div>
        </section>
    )
}

export default ManageComment;