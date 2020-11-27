import React, { useState, useEffect } from 'react';
import { UncontrolledDropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
// import Button from '../../../components/Button';
//import Select from '../../../components/Select';
import { swalCreate } from '../../../components/helpers/alerts';
import ReactTagInput from "@pathofdev/react-tag-input";
import OffersFormCross from '../../../svg/offers-form-cross';
import StoriesHouseIcon from '../../../svg/stories-house';
import Browse from '../../../svg/browse';
import StoriesPublishIcon from '../../../svg/stories-publish';
import OffersViewEdit from '../../../svg/offers-view-edit';
import StoriesModal from './modal';
import "@pathofdev/react-tag-input/build/index.css";
import CategoryScroll from '../../../components/CategoryScroll'
import TextEditor from '../../../components/TextEditor'
import Imagepond from '../../../components/Imagepond'
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { tryParseJson } from '../../../components/helpers/validator'
import LoadingScreen from '../../../components/LoadingScreen'

const StoriesForm = ({ data={}, handleForm, afterSubmit }) => {
    const [errors, setErrors] = useState({});
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState({});
    const [modal, setModal] = useState(false);
    const [category, setCategory] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [oldContent, setOldContent] = useState('');
    const [editorState, setEditorState] = useState( EditorState.createEmpty() );
    const [content, setContent] = useState(''); //new text content
    const [saveAs, setSaveAs] = useState('publish');
    const [togglePub, setTogglePub] = useState(false);
    // temporary has value
    const [hasFeaturedImage, setHasFeaturedImage] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const toggle = () => setModal(!modal);

    useEffect(()=>{
        if(data.id){
            const { title, description, short_description } = data
            setForm({ title })
            if(tryParseJson(description)){
                setOldContent(description)
            } else {
                const block = convertFromHTML(description);
                const cState = ContentState.createFromBlockArray( block.contentBlocks, block.entityMap)
                setEditorState(EditorState.createWithContent(cState));
            }

        }
    }, [data])
    //Depreciate
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        let errors = "";

        try {
            Object.keys(form).map(key => {
                formData.append(key, form[key]);
            });

            formData.append('tags', JSON.stringify(tags));
            formData.append('description', content)
            formData.append('short_description', editorState.getCurrentContent().getPlainText('\u0001') );
            formData.append('saveAs', saveAs);

            let response = await axios.post('/api/web/stories', formData)

            await swalCreate("/admin/stories")
        } catch (err) {
            let { data } = err.response;

            errors = data.errors;
        }

        setErrors(errors || {});
    }

    const attemptSubmit = () => {
        setSubmitting(true)
        const params = {
            ...form,
            saveAs,
            photo,
            description: content,
            category,
            short_description: editorState.getCurrentContent().getPlainText('\u0001')
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
                (submitting) &&
                <LoadingScreen title={
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
                <form onSubmit={handleSubmit}>
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
                        <TextEditor className={''} rawBlocks={oldContent} handleUpdate={setContent} editorState={editorState} handleEditorState={setEditorState} />
                    }
                    
                    <Imagepond photo={photo} imageSelected={setPhoto} errors={errors.photo}/>
                </form>
            </section>
            <section className="form-footer">
                <button className="discard" onClick={handleClose}>Discard</button>
                <div className="flex-grow-1"></div>
                <button className={'btn'} onClick={toggle}>Preview</button>
                <ButtonGroup className={'publish-btn'}>
                    <Button color={'primary'} onClick={attemptSubmit}>{saveAs=='publish' ? 'Publish' : 'Draft'}</Button>
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
                <StoriesModal title={form.title} handleChange={handleChange} modal={modal} toggle={toggle} editorState={editorState} setEditorState={setEditorState}/>
            }
        </section>
       
    );
}

export default StoriesForm;