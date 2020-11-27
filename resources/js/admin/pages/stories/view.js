import React, { useState, useEffect } from 'react';
import OffersViewStatus from '../../../svg/offers-view-status';
import OffersViewEdit from '../../../svg/offers-view-edit';
import Circlet from '../../../svg/circlet';
import StoriesCatChildrenIcon from '../../../svg/stories-cat-children';
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from "draft-js";
import { tryParseJson } from '../../../components/helpers/validator'
import LoadingScreen from '../../../components/LoadingScreen'
import { swalDelete2 } from '../../../components/helpers/alerts';

const View = ({data = {}, handleForm, afterSubmit }) => {
    const { title, description, date_numb } = data
    const [editorState, setEditorState] = useState( EditorState.createEmpty() );

    const [loading, setLoading] = useState(null);

    useEffect(()=>{
        if(data.id){
            if(tryParseJson(description)){
                setEditorState( EditorState.createWithContent( convertFromRaw( JSON.parse(description) ) ) ); 
            } else {
                const block = convertFromHTML(description);
                const cState = ContentState.createFromBlockArray( block.contentBlocks, block.entityMap)
                setEditorState( EditorState.createWithContent(cState) );
            }
            console.log('called?',description)
        }
    }, [data])

    const deleting = () => {
        if(data.id) {
            swalDelete2(title)
            .then(()=> {
                setLoading('Deleting Story...')
                api.delete(`/api/web/stories/${data.id}`)
                .then(()=>{
                    afterSubmit();
                }).finally(()=>{
                    setLoading(null)
                    handleForm()
                })
            })
        }
    }

    const togglePublish = () => {
        setLoading(data.released_at ? 'Unpublishing Story...' : 'Publishing Story...')
        api.post(`/api/web/stories/${data.id}/toggle`)
            .then(()=>{
                afterSubmit();
                setLoading(null);
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
                    <span className="delete">Delete</span>
                    <span className="unpublished">Unpublished</span>
                    <div onClick={() => handleForm(data, true)}>
                        <OffersViewEdit />
                        <label>Edit</label>
                    </div>
                </div>
            </header>
            <article className="view-story__body">
                <div className="bg-cover bg-center" style={{backgroundImage: "url(https://www.ratemds.com/blog/wp-content/uploads/2015/09/handshake-shaking-hands-shake-hands-trust.jpg)"}}></div>
                <div className="content">
                    <div  className="title">
                        <h2>{title}</h2>
                        <span>{date_numb || 'missing_date'}</span>
                    </div>
                    <div className="type">
                        <StoriesCatChildrenIcon />
                        <label>Children</label>
                    </div>
                    <Editor editorState={editorState} readOnly={true} />
                </div>
            </article>
        </section>
    )
}

export default View;