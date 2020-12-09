import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Editor as EditorDraft, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CircleImageForm from '../../../components/CircleImageForm';
import LoadingScreen from '../../../components/LoadingScreen'
import { tryParseJson } from '../../../components/helpers/validator';

const TemplateForm = () => {
    const [photo, setPhoto] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmit] = useState(false);
    const [orgDetails, setOrgDetails] = useState({
        org_name: 'Organisation Name',
        org_location: 'missing-address'
    });
    const [links, setLinks] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        text: ''
    });

    const [bodyField, setBodyField] = useState({
        editorState: EditorState.createEmpty()
    });

    const [form, setForm] = useState({
        id: '',
        subject: '',
        html_content: '',
        raw_draft_json: ''
    })

    useEffect(() => {
        if(!loaded){
            setLoading(true)
            loadTemplate()
        }
    }, [loaded])

    useEffect(() => {
       saveDraft()
    }, [bodyField])

    const addHttp = (i) => {
        let newLink = encodeURI(i);
        return newLink.search(/^(http|https)/) >= 0 ? newLink : 'http://' + newLink; 
    }

    const saveDraft = () => {
        const raw_draft_json = convertToRaw(bodyField.editorState.getCurrentContent());
        const html_content = draftToHtml(raw_draft_json);
        setForm({...form, html_content, raw_draft_json })
    }

    const loadTemplate = (clearCache = false) => {
        const token = axios.CancelToken.source();
        api.get(`/api/web/receipt/template`, {
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then(({ data })=>{
            const { id, subject, html_content, raw_draft_json, org_name, org_location, photo } = data.data
            setForm({...form, id, subject})
            setPhoto(photo)
            setOrgDetails({org_name, org_location})
            if(tryParseJson(raw_draft_json)){
                setBodyField({ editorState: EditorState.createWithContent( convertFromRaw( JSON.parse(raw_draft_json) ) )})
            }
            setLoading(false)
        }).finally(()=>{
            setLoaded(true);
        })
        return token; //for useEffect
    }

    const onChangePhoto = (file) => {
        const reader = new FileReader();
        reader.onload = (e2) => {
            setPhoto(e2.target.result)
        }
        reader.readAsDataURL(file)
    }

    const handleOnChangeBody = (editorState) => {
        setBodyField({editorState});
    }

    const updateLinks = ({target}) => {
        setLinks({
            ...links,
            [target.name] : target.value
        })
    }

    const submit = () => {
        setSubmit(true)
        saveDraft();
        api.post(`/api/web/receipt/template`, {
            ...form,
            ...links,
            photo
        }).then(({ data })=>{
            const { id, subject, html_content, raw_draft_json, org_name, org_location, photo } = data.data

        }).finally(()=>{
            setSubmit(false);
        })
        return token; //for useEffect
    }

    return(
        <section className="flex">
        {
            (loading || submitting) && 
            <LoadingScreen title={
                (loading && 'Loading Template...') ||
                (submitting && 'Updating Template') ||
                'Please wait...'
            }/> 
        }
            <section className="payment-r-template__left tab__content w-1/2">
                <div>
                    <CircleImageForm src={photo} onChangeFile={onChangePhoto}/>
                    <form>
                        <div className="w-full xl:w-full">
                            <div className="form-group form-input-text">
                                <label>Subject</label>
                                {/* <label>{draftToHtml(convertToRaw(bodyField.editorState.getCurrentContent()))}</label> */}
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    value={form.subject || ''}
                                    onChange={e => setForm({...form, subject: e.target.value})}
                                    placeholder="Enter Subject"
                                />
                            </div>
                            <div className="form-group form-input-text no-border-field">
                                <label>Body</label>
                                {/* <label>{draftToHtml(convertToRaw(bodyField.editorState.getCurrentContent()))}</label> */}
                                <Editor
                                    editorState={bodyField.editorState}
                                    onEditorStateChange={handleOnChangeBody}    
                                    toolbar={{
                                        inline: { inDropdown: true },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        link: { inDropdown: true },
                                        history: { inDropdown: true },
                                        
                                    }}
                                />
                            </div>
                            <div className="form-group form-input-text no-border-field">
                                <label>Footer</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="facebook"
                                    value={links.facebook || ''}
                                    onChange={updateLinks}
                                    placeholder="Enter Facebook Link"
                                />
                                <input
                                    className="input-field"
                                    type="text"
                                    name="twitter"
                                    value={links.twitter || ''}
                                    onChange={updateLinks}
                                    placeholder="Enter Twitter Link"
                                />
                                <input
                                    className="input-field"
                                    type="text"
                                    name="instagram"
                                    value={links.instagram || ''}
                                    onChange={updateLinks}
                                    placeholder="Enter Instagram Link"
                                />
                            </div>
                            <div className="form-group form-input-text no-border-field">
                                <label>Footer Text</label>
                                <textarea
                                    className="w-full form-textarea border-gray-300"
                                    type="text"
                                    name="text"
                                    value={links.text || ''}
                                    onChange={updateLinks}
                                    placeholder="Enter Footer Text"
                                />
                            </div>
                        </div> 
                    </form>
                </div>
                <footer className="payment__footer org-form__footer">
                    <div className="flex">
                        <button className="discard">Discard</button>
                        <button className="primary-btn next" onClick={submit}>Save</button>
                    </div>
                </footer>
            </section>
            <section className="payment-r-template__right w-1/2">
                <h2>Preview</h2>
                <article>
                    <header>
                        <img className="rounded-full" src={photo || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'} />
                        <div className="payment-r-template__right-headings">
                            <label>{orgDetails.org_name || 'Organisation Name'}</label>
                            <address>{orgDetails.org_location || 'missing-location'}</address>
                            {/*<address>St. Leonards NSW 2065 Australia</address>*/}
                        </div>
                    </header>
                    <section className="payment-r-template__right-body">
                        <header>
                            <p><b>Dear Charles,</b></p>
                        </header>
                        <section className="content">
                            <EditorDraft editorState={bodyField.editorState} readOnly={true} />
                        </section>
                        <section>
                            <p><b>Organisation Name</b></p>
                        </section>
                        <footer>
                            <label>Summary</label>
                            <ul>
                                <li>
                                    <p>Donation to Organisation Name</p>
                                    <span>$50.00</span>
                                </li>
                                <li>
                                    <p><strong>Amount Paid</strong></p>
                                    <span>$50.00</span>
                                </li>
                            </ul>
                        </footer>
                    </section>
                    <footer>
                        <ul>
                            {
                                links.facebook && <li><a target="_blank" href={addHttp(links.facebook)} ><i className="fab fa-facebook-f"></i></a></li>
                            }
                            {
                                links.twitter && <li><a target="_blank" href={addHttp(links.twitter)} ><i className="fab fa-twitter"></i></a></li>
                            }
                            {
                                links.instagram && <li><a target="_blank" href={addHttp(links.instagram)} ><i className="fab fa-instagram"></i></a></li>
                            }
                        </ul>
                        <p>{ links.text || 'Add contents here'}</p>
                    </footer>
                </article>
            </section>
        </section>
    )
}

export default TemplateForm;