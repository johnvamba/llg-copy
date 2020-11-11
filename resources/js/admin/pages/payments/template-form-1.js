import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import OffersFormCross from '../../../svg/offers-form-cross';

const TemplateForm1 = () => {
    const [imageUpload, setImageUpload] = useState([]);
    const [bodyField, setBodyField] = useState({
        editorState: EditorState.createEmpty()
    });

    const handleOnChangeBody = (editorState) => {
        setBodyField({editorState});
    }

    const uploadImageCallBack = (file) => {
        let uploadedImages = imageUpload;
        const imageObject = {
          file: file,
          localSrc: URL.createObjectURL(file),
        }
        uploadedImages.push(imageObject);
        setImageUpload({ uploadedImages: uploadedImages })

        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
    }

    return(
        <>
            <section className="template-form-1 create-form">
                <section className="template-form-1__left">
                    <header>
                        <h2>Add Template</h2>
                    </header>
                    <section className="content">
                        <div className="form-group form-input-text">
                            <label>Template Name</label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter Template Name"
                            />
                        </div>
                        <div className="form-group form-input-text">
                            <label>Subject</label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter Subject"
                            />
                        </div>
                        <div className="template-form-1__element">
                            <label>Add Element</label>
                            <ul>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i class="fas fa-heading"></i>
                                        <span>Heading</span>
                                    </div>
                                    <i class="fas fa-plus"></i>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i class="fas fa-align-left"></i>
                                        <span>Paragraph</span>
                                    </div>
                                    <i class="fas fa-plus"></i>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i class="far fa-image"></i>
                                        <span>Image</span>
                                    </div>
                                    <i class="fas fa-plus"></i>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i class="fas fa-list-ol"></i>
                                        <span>Ordered List</span>
                                    </div>
                                    <i class="fas fa-plus"></i>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i class="fas fa-code"></i>
                                        <span>HTML</span>
                                    </div>
                                    <i class="fas fa-plus"></i>
                                </li>
                            </ul>
                        </div>
                    </section>
                </section>
                <section className="template-form-1__right">
                    <div className="form-group form-input-text no-border-field">
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
                                image: { uploadCallback: uploadImageCallBack, previewImage: true, },
                            }}
                        />
                    </div>
                </section>
                <footer className="org-form__footer">
                    <div className="flex">
                        <button className="discard">Discard</button>
                        <button className="next">Save</button>
                    </div>
                </footer>
            </section>
        </>
    )
}


export default TemplateForm1;