import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import OffersFormCross from '../../../svg/offers-form-cross';

const ReceiptTemplateV2 = () => {
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
            <section className="receipt-template create-form">
                <header className="create-story__header">
                    <h2>Add Template</h2>
                    <button type="button">
                        <OffersFormCross />
                    </button>
                </header>
                <section>
                    <form>
                        <div className="w-full xl:w-full">
                            <div className="form-group form-input-text">
                                <label>Template Name</label>
                                {/* <label>{draftToHtml(convertToRaw(bodyField.editorState.getCurrentContent()))}</label> */}
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Template Name"
                                />
                            </div>
                            <div className="form-group form-input-text">
                                <label>Surname</label>
                                {/* <label>{draftToHtml(convertToRaw(bodyField.editorState.getCurrentContent()))}</label> */}
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter Surname"
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
                                        image: { uploadCallback: uploadImageCallBack, previewImage: true, },
                                    }}
                                />
                            </div>
                            <div className="form-group form-input-text no-border-field">
                                <label>Footer</label>
                                <div className="payment-footer__field"></div>
                            </div>
                        </div> 
                    </form>
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


export default ReceiptTemplateV2;