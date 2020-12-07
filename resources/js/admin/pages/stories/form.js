import React, { useState, useEffect } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';
import { swalCreate } from '../../../components/helpers/alerts';
import ReactTagInput from "@pathofdev/react-tag-input";
import OffersFormCross from '../../../svg/offers-form-cross';
import StoriesPublishIcon from '../../../svg/stories-publish';
import StoriesModal from './modal';
import "@pathofdev/react-tag-input/build/index.css";
import CategoryScroll from '../../../components/CategoryScroll'
import TextEditor from '../../../components/TextEditor'
import Imagepond from '../../../components/Imagepond'
import { EditorState, convertFromHTML, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { tryParseJson } from '../../../components/helpers/validator'
import LoadingScreen from '../../../components/LoadingScreen'
import { selectStyle, loadOrganization } from '../../../components/helpers/async_options';
import AsyncSelect from 'react-select/async';
import { connect } from 'react-redux';
import { monetary } from '../needs/categorylist';

const StoriesForm = ({ data={}, handleForm, afterSubmit, AuthUserReducer }) => {
    const { roles } = AuthUserReducer;

    const [errors, setErrors] = useState({});
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState({});
    const [modal, setModal] = useState(false);
    const [category, setCategory] = useState([]);
    const [photo, setPhoto] = useState(null);
    // const [oldContent, setOldContent] = useState('');
    const [editorState, setEditorState] = useState( EditorState.createEmpty() );
    const [saveAs, setSaveAs] = useState('publish');
    const [togglePub, setTogglePub] = useState(false);
    // temporary has value
    const [hasFeaturedImage, setHasFeaturedImage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [organization, setOrganization] = useState({});

    const toggle = () => setModal(!modal);

    useEffect(()=>{
        if(data.id){
            const { title } = data
            setForm({ title })
            loadStory()
        }
    }, [data])

    const loadStory = () => {
        setLoading('Loading story...')
        api.get(`/api/web/stories/${data.id}`)
            .then(({data})=>{
                const { title, description, categories, organization, raw_draft_json, photo } = data.data
                if(tryParseJson(raw_draft_json)){
                    setEditorState( EditorState.createWithContent( convertFromRaw( JSON.parse(raw_draft_json) ) ) ); 
                }
                setOrganization(organization);
                setCategory( monetary.filter(i => categories.includes(i.name) ) );
                setLoading(null);
            })
    }

    const attemptSubmit = () => {
        setSubmitting(true)
        setModal(false)
        const raw_draft_json = JSON.stringify( convertToRaw(editorState.getCurrentContent()) );
        const description = editorState.getCurrentContent().getPlainText('\u0001');
        const params = {
            ...form,
            saveAs,
            photo,
            description,
            raw_draft_json,
            category,
            organization,
            short_description: description.slice(0, 100)
        }
        const submitPromise = !data.id ? 
            api.post(`/api/web/stories`, params) : 
            api.patch(`/api/web/stories/${data.id}`, { ...params })

        submitPromise.then(({data})=>{
            setSubmitting(false)
            handleForm(); //cleardata
            afterSubmit(data.data, saveAs)
        }).catch(err=>{
            if(err.response){
                const { data } = err.response
                setErrors(data.errors || [])
            }
            setSubmitting(false)
        })
    }

    const handleChange = (e) => {
        let inputs = { ...form };
        inputs[e.target.name] = e.target.value;
        setForm(inputs);
    }

    const removeError= (name = '') => {
        delete errors[name]
        setErrors(errors)
    }

    const handleUpload = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            delete form['media'];
            return ;
        }

        createImage(files[0]);
    }

    const handleCategories = (item, truth = false) => {
        if(truth)
            setCategory(category.filter(i=>item.slug != i.slug))
        else 
            setCategory([item, ...category])
    }

    const createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let inputs = { ...form };
            inputs['media'] = e.target.result;
            setForm(inputs);
        };
        reader.readAsDataURL(file);
    }

    const handleClose = () => {
        handleForm({});
    }


    return (
        <section className="form create-story">
            {
                (submitting || loading) &&
                <LoadingScreen title={
                    ( loading ) ||
                    (submitting && (data.id ? 'Updating Story' : 'Creating Story')) ||
                    'Please wait'
                }/>
            }
            <section className="form-title">
                <h3>{ !(data.id) ? 'Create' : 'Edit' } Story</h3>
                <button type="button" onClick={handleClose}>
                    <OffersFormCross />
                </button>
            </section>
            <section className="form-body create-story__body">
                <form>
                    {
                        //Set user priveledges here.. campus users will need to know what organization is asking for need.
                        (roles.name == 'admin') && <div className={`form-group w-full ${errors.organization && 'form-error'}`}>
                            <label>Organization</label>
                            <AsyncSelect
                                styles={selectStyle}
                                loadOptions={loadOrganization}
                                defaultOptions
                                cacheOptions
                                value={organization}
                                placeholder="Organization"
                                onChange={setOrganization}
                                />
                            {
                                (errors.organization || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organization</span>
                            }
                        </div>
                    }
                    <CategoryScroll 
                        type={'monetary'}
                        selectedCategories={category} 
                        handleCategories={handleCategories}
                        errors={errors.category}
                    />
                    <div className="form-group">
                        <label>Title</label>
                        <input 
                            className="input-field"
                            type="text"
                            placeholder="Enter Title"
                            value={form.title}
                            name="title"
                            onChange={handleChange}
                        />
                    </div>

                    { !modal &&
                        <TextEditor className={''} editorState={editorState} handleEditorState={setEditorState} />
                    }
                    
                    <Imagepond photo={photo} imageSelected={setPhoto} errors={errors.photo}/>
                </form>
            </section>
            <section className="form-footer">
                <button className="discard" onClick={handleClose}>Discard</button>
                <div className="flex-grow-1"></div>
                <button className={'preview'} onClick={toggle}>Preview</button>
                <ButtonGroup className={'publish-btn'}>
                    <Button className='actual-btn' color={'primary'} onClick={attemptSubmit}>{saveAs=='publish' ? 'Publish' : 'Draft'}</Button>
                    <ButtonDropdown className={'btn btn-primary'} direction="up" onClick={()=>setTogglePub(!togglePub)} isOpen={togglePub} toggle={(e)=>{}}>
                      <DropdownToggle tag="button">
                        <StoriesPublishIcon />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={()=>setSaveAs('draft')}>Draft</DropdownItem>
                        <DropdownItem onClick={()=>setSaveAs('publish')}>Publish</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                </ButtonGroup>
            </section>
            {
                modal &&
                <StoriesModal setSaveAs={setSaveAs} attemptSubmit={attemptSubmit} setTogglePub={setTogglePub} togglePub={togglePub} saveAs={saveAs} title={form.title} photo={photo} handleChange={handleChange} modal={modal} toggle={toggle} editorState={editorState} setEditorState={setEditorState}/>
            }
        </section>
       
    );
}
export default connect(({AuthUserReducer})=>{
    return {
        AuthUserReducer
    }
},(dispatch)=>{
    return {

    }
})(StoriesForm);
