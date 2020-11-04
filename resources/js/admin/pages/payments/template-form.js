import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TemplateForm = () => {

    const [bodyField, setBodyField] = useState({
        editorState: EditorState.createEmpty()
    });

    const handleOnChangeBody = (editorState) => {
        setBodyField({editorState});
    }

    return(
        <section className="flex">
            <section className="payment-r-template__left tab__content w-1/2">
                <div>
                    <header>
                        <div className="image"></div>
                        <div>
                            <button>Upload Photo</button>
                            <p>Images should be atleast 300 x 300 px in pngo or jpeg file</p>
                        </div>
                    </header>
                    <form>
                        <div className="w-full xl:w-full">
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
                                        
                                    }}
                                />
                            </div>
                            <div className="form-group form-input-text no-border-field">
                                <label>Footer</label>
                                <div className="payment-footer__field"></div>
                            </div>
                        </div> 
                    </form>
                </div>
                <footer className="payment__footer org-form__footer">
                    <div className="flex">
                        <button className="discard">Discard</button>
                        <button className="next">Save</button>
                    </div>
                </footer>
            </section>
            <section className="payment-r-template__right w-1/2">
                <h2>Preview</h2>
                <article>
                    <header>
                        <img class="rounded-full" src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" />
                        <div className="payment-r-template__right-headings">
                            <label>Organisation Name</label>
                            <address>72-76 Chandos Street</address>
                            <address>St. Leonards NSW 2065 Australia</address>
                        </div>
                    </header>
                    <section className="payment-r-template__right-body">
                        <header>
                            <p><b>Dear Charles,</b></p>
                        </header>
                        <section className="content">
                            <p>Thank you for your help! Your donation of $50.00 has successfully been sent to Organisation Name.</p>
                        </section>
                        <section>
                            <p>Warm Regards,</p>
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
                                    <p>Amount Paid</p>
                                    <span>$50.00</span>
                                </li>
                            </ul>
                        </footer>
                    </section>
                    <footer>
                        <ul>
                            <li><i class="fab fa-facebook-f"></i></li>
                            <li><i class="fab fa-twitter"></i></li>
                            <li><i class="fab fa-instagram"></i></li>
                        </ul>
                        <p>The Music Broadcasting Society of New South Wales Co-operative Limited ABN: 64 739 540 010</p>
                    </footer>
                </article>
            </section>
        </section>
    )
}

export default TemplateForm;