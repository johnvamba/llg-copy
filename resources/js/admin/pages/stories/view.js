import React, { useState, useEffect } from 'react';
import OffersViewStatus from '../../../svg/offers-view-status';
import OffersViewEdit from '../../../svg/offers-view-edit';
import Circlet from '../../../svg/circlet';
import StoriesCatChildrenIcon from '../../../svg/stories-cat-children';
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from "draft-js";
import { tryParseJson } from '../../../components/helpers/validator'
import LoadingScreen from '../../../components/LoadingScreen'
import { swalDelete2, swalSuccess } from '../../../components/helpers/alerts';
import { monetary } from '../needs/categorylist';
import { useSelector } from 'react-redux';

const View = ({data = {}, handleForm, afterSubmit }) => {
    const { title, description, date_numb, raw_draft_json, photo, appreciates_count = 0, comments_count = 0 } = data
    const [editorState, setEditorState] = useState( EditorState.createEmpty() );
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(null);
    const roles = useSelector(({AuthUserReducer}) => AuthUserReducer.roles)

    useEffect(()=>{
        if(data.id){
            loadStory(true)
        }
    }, [data])

    const loadStory = (cacheClear = false) => {
        setLoading("Loading story...")
        api.get(`/api/web/stories/${data.id}`)
            .then(({data})=>{
                const { title, description, categories, raw_draft_json, photo } = data.data
                if(tryParseJson(raw_draft_json)){
                    setEditorState( EditorState.createWithContent( convertFromRaw( JSON.parse(raw_draft_json) ) ) ); 
                }
                setCategories(monetary.filter(i => categories.includes(i.name)));
                setLoading(null);
            })
    }

    const deleting = () => {
        if(data.id) {
            swalDelete2(title)
            .then((result)=> {
                if(result.value) {
                    setLoading('Deleting Story...')
                    api.delete(`/api/web/stories/${data.id}`)
                    .then(()=>{
                        afterSubmit(data, 'delete');
                        swalSuccess('Story Removed.')
                    }).finally(()=>{
                        setLoading(null)
                        handleForm()
                    })
                }
            })
        }
    }

    const togglePublish = () => {
        setLoading(data.released_at ? 'Unpublishing Story...' : 'Publishing Story...')
        api.post(`/api/web/stories/${data.id}/toggle`)
            .then(()=>{
                afterSubmit(data, data.released_at ? 'unpublished' : 'published');
                setLoading(null);
                swalSuccess(data.released_at ? 'Story Published' : 'Story Unpublished')
                handleForm()
            })
    }

    return (
        <section className="view-story">
            {
                (loading) &&
                <LoadingScreen title={loading}/>
            }
            <header className="view-story__header flex flex-wrap">
                <div className="view-story__header-left flex flex-wrap">
                    <Circlet />
                    <label>{data.released_at ? 'Published' : 'Draft' }</label>
                </div>
                <div className="view-story__header-right flex flex-wrap" >
                    <span className="delete mr-2 cursor-pointer" onClick={deleting}>Delete</span>

                    {
                        roles.name != 'organization admin' && 
                            ((data.released_at) ? 
                            <span className="unpublished cursor-pointer" onClick={togglePublish}>Unpublish</span> :
                            <span className="publish cursor-pointer" onClick={togglePublish}>Publish</span>)
                            
                    }
                    <div onClick={() => handleForm(data, true)}>
                        <OffersViewEdit />
                        <label>Edit</label>
                    </div>
                    <span className="ver-divider"></span>
                    <button className="" onClick={()=>handleForm()}>
                        <i className="">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L13 13" stroke="#98999B" strokeWidth="1.5"/>
                                <path d="M13 1L1 13" stroke="#98999B" strokeWidth="1.5"/>
                            </svg>
                        </i>
                    </button>
                </div>
            </header>
            <article className="view-story__body">
                <div className="bg-cover bg-center" style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} ></div>
                <div className="content">
                    <div  className="title">
                        <h2>{title}</h2>
                        <span>{date_numb || 'missing_date'}</span>
                    </div>
                    <div className="category-list">
                        {
                            categories.map(i => <div key={i.slug} className="type mr-2">
                            {<i.svg_class fill={'#109CF1'} className="svg-icon"/>}
                            <label>{i.name}</label>
                        </div>)
                        }
                    </div>
                    <Editor editorState={editorState} readOnly={true} />
                </div>
            </article>
            {
                data.released_at && <section className="story-counts">
                    <button>
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5486 2.05691C17.5676 0.943808 16.2067 0.330811 14.7166 0.330811C12.6209 0.330811 11.2941 1.58244 10.5501 2.63246C10.3571 2.90493 10.1929 3.17814 10.055 3.43523C9.91718 3.17814 9.75302 2.90493 9.55995 2.63246C8.81596 1.58244 7.48916 0.330811 5.39347 0.330811C3.9034 0.330811 2.54249 0.943847 1.56146 2.05695C0.625728 3.11878 0.110352 4.54087 0.110352 6.06125C0.110352 7.71622 0.756485 9.25551 2.14377 10.9054C3.38363 12.38 5.16735 13.9 7.23285 15.6601C8.00252 16.316 8.79844 16.9942 9.6458 17.7356L9.67124 17.7579C9.7811 17.8541 9.91807 17.9022 10.055 17.9022C10.192 17.9022 10.329 17.8541 10.4388 17.7579L10.4643 17.7356C11.3117 16.9942 12.1076 16.316 12.8774 15.66C14.9427 13.9 16.7265 12.3801 17.9663 10.9054C19.3536 9.25547 19.9997 7.71622 19.9997 6.06125C19.9997 4.54087 19.4844 3.11878 18.5486 2.05691ZM12.1214 14.7731C11.4579 15.3384 10.7751 15.9203 10.055 16.5463C9.33507 15.9204 8.65218 15.3385 7.98857 14.773C3.94625 11.3284 1.27575 9.0527 1.27575 6.06125C1.27575 4.82476 1.68771 3.67631 2.43578 2.82747C3.19243 1.969 4.2428 1.4962 5.39347 1.4962C6.99119 1.4962 8.024 2.4805 8.60903 3.30622C9.1338 4.04679 9.40763 4.79334 9.50102 5.07991C9.57914 5.31978 9.80278 5.48212 10.055 5.48212C10.3073 5.48212 10.531 5.31978 10.6091 5.07991C10.7025 4.79334 10.9763 4.04679 11.5011 3.30618C12.0861 2.4805 13.1189 1.4962 14.7166 1.4962C15.8673 1.4962 16.9177 1.969 17.6743 2.82747C18.4224 3.67631 18.8343 4.82476 18.8343 6.06125C18.8343 9.0527 16.1638 11.3284 12.1214 14.7731Z" fill="#CF995F"/>
                            <path d="M12.1214 14.7731C11.4579 15.3384 10.7751 15.9203 10.055 16.5463C9.33507 15.9204 8.65218 15.3385 7.98857 14.773C3.94625 11.3284 1.27575 9.0527 1.27575 6.06125C1.27575 4.82476 1.68771 3.67631 2.43578 2.82747C3.19243 1.969 4.2428 1.4962 5.39347 1.4962C6.99119 1.4962 8.024 2.4805 8.60903 3.30622C9.1338 4.04679 9.40763 4.79334 9.50102 5.07991C9.57914 5.31978 9.80278 5.48212 10.055 5.48212C10.3073 5.48212 10.531 5.31978 10.6091 5.07991C10.7025 4.79334 10.9763 4.04679 11.5011 3.30618C12.0861 2.4805 13.1189 1.4962 14.7166 1.4962C15.8673 1.4962 16.9177 1.969 17.6743 2.82747C18.4224 3.67631 18.8343 4.82476 18.8343 6.06125C18.8343 9.0527 16.1638 11.3284 12.1214 14.7731Z" fill="#CF995F"/>
                        </svg>
                        { appreciates_count || 0 } Appreciates
                    </button>
                    <button onClick={()=>handleForm(data, false, false, true)}>
                        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5631 14.2341L10.133 13.6197L10.5631 14.2341ZM5.2737 17.9367L4.8436 17.3223L5.2737 17.9367ZM1.75 4.00147C1.75 2.75882 2.75736 1.75146 4 1.75146V0.251465C1.92893 0.251465 0.25 1.9304 0.25 4.00147H1.75ZM1.75 11.1979V4.00147H0.25V11.1979H1.75ZM4 13.4479C2.75736 13.4479 1.75 12.4406 1.75 11.1979H0.25C0.25 13.269 1.92894 14.9479 4 14.9479V13.4479ZM4.759 13.4479H4V14.9479H4.759V13.4479ZM5.709 17.7728V14.3979H4.209V17.7728H5.709ZM10.133 13.6197L4.8436 17.3223L5.70379 18.5511L10.9932 14.8485L10.133 13.6197ZM16.4751 13.4479H10.6778V14.9479H16.4751V13.4479ZM18.7251 11.1979C18.7251 12.4406 17.7177 13.4479 16.4751 13.4479V14.9479C18.5461 14.9479 20.2251 13.269 20.2251 11.1979H18.7251ZM18.7251 4.00146V11.1979H20.2251V4.00146H18.7251ZM16.4751 1.75146C17.7177 1.75146 18.7251 2.75883 18.7251 4.00146H20.2251C20.2251 1.9304 18.5461 0.251465 16.4751 0.251465V1.75146ZM4 1.75146H16.4751V0.251465H4V1.75146ZM10.9932 14.8485C10.9008 14.9132 10.7907 14.9479 10.6778 14.9479V13.4479C10.4829 13.4479 10.2927 13.5079 10.133 13.6197L10.9932 14.8485ZM4.209 17.7728C4.209 18.5414 5.07415 18.9919 5.70379 18.5511L4.8436 17.3223C5.20813 17.0671 5.709 17.3279 5.709 17.7728H4.209ZM4.759 14.9479C4.45525 14.9479 4.209 14.7017 4.209 14.3979H5.709C5.709 13.8733 5.28367 13.4479 4.759 13.4479V14.9479Z" fill="#98999B"/>
                        </svg>
                        { comments_count || 0 } Comments
                    </button>
                </section>
            }
        </section>
    )
}

export default View;