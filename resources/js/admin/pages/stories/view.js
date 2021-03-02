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

const View = ({data = {}, handleForm, afterSubmit }) => {
    const { title, description, date_numb, raw_draft_json, photo } = data
    const [editorState, setEditorState] = useState( EditorState.createEmpty() );
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(null);

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
                        afterSubmit();
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
                afterSubmit();
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
                    <span className="delete" onClick={deleting}>Delete</span>
                    {
                        data.released_at ? 
                        <span className="unpublished" onClick={togglePublish}>Unpublish</span> :
                        <span className="publish" onClick={togglePublish}>Publish</span>
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
        </section>
    )
}

export default View;