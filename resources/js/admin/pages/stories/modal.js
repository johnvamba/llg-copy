import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import StoriesHeartIcon from '../../../svg/stories-heart';
import StoriesCommentIcon from '../../../svg/stories-comment';
import StoriesShareIcon from '../../../svg/stories-share';
import StoriesNoImageIcon from '../../../svg/preview-no-image';
import StoriesPublishIcon from '../../../svg/stories-publish';
import TextEditor from '../../../components/TextEditor'
import { Editor, EditorState, convertToRaw, convertFromHTML } from "draft-js";

const StoriesModal = ({title, handleChange, photo, modal, toggle, textButton, editorState, setEditorState, setSaveAs, attemptSubmit, setTogglePub, togglePub, saveAs}) => {
    const { roles, profile } = useSelector(state => state.AuthUserReducer);
    return (
        <section className="story-preview">
            <Modal isOpen={modal} toggle={toggle} className="story-preview__modal">
                <ModalBody>
                    <div className="flex">
                        <section className="w-1/2 story-preview__modal-left">
                            <h2>Preview</h2>
                            <form>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input className="input-field" value={title} onChange={handleChange} type="text" name="title" placeholder="Long Title Here" />
                                </div>
                                <TextEditor className={''}
                                    editorState={editorState} handleEditorState={setEditorState} />
                            </form>
                            <section className="story-preview__modal-footer">
                                <div className="story-preview__modal-footer-container">
                                    <ButtonGroup className={'publish-btn'}>
                                        <Button className='primary-btn actual-btn' color={'primary'} onClick={attemptSubmit}>{textButton()}</Button>
                                        <ButtonDropdown className={'primary-btn btn btn-primary'} direction="up" onClick={()=>setTogglePub(!togglePub)} isOpen={togglePub} toggle={(e)=>{}}>
                                          <DropdownToggle tag="button">
                                            <StoriesPublishIcon />
                                          </DropdownToggle>
                                          <DropdownMenu>
                                            <DropdownItem onClick={()=>setSaveAs('draft')}>Draft</DropdownItem>
                                            <DropdownItem onClick={()=>setSaveAs(roles.name != 'organization admin' ? 'publish' : 'submit')}>{roles.name != 'organization admin' ? 'Publish' : 'Submit'}</DropdownItem>
                                          </DropdownMenu>
                                        </ButtonDropdown>
                                    </ButtonGroup>
                                    <div>
                                        <button className="discard" onClick={toggle}>
                                            Close Preview
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </section>
                        <section className="w-1/2 story-preview__modal-right">
                            <div className="mobile-mockup">
                                <div className="mockup-body">
                                    <div className="mock-image" style={{backgroundImage: photo || 'none'}}>
                                        {
                                            photo ? <img src={photo}/> :
                                            <StoriesNoImageIcon />
                                        }
                                    </div>
                                    <div className="content">
                                        <h2>{title || 'Sample Title'}</h2>
                                        <div className="under-title">
                                            <div>
                                                <StoriesHeartIcon />
                                                <span>Just now</span>
                                            </div>
                                            <span>.</span>
                                            <div>
                                                <StoriesHeartIcon />
                                                <span>0 Appreciates</span>
                                            </div>
                                        </div>
                                        <div className="author">
                                            <div className="left">D</div>
                                            <div className="right">
                                                <span>written by</span>
                                                <label>{profile.name}</label>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                            <Editor editorState={editorState} readOnly={true} />
                                            // { markup() }
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <ul>
                                        <li>
                                            <StoriesHeartIcon />
                                            <span>Appreciate</span>
                                        </li>
                                        <li>
                                            <StoriesCommentIcon />
                                            <span>Comment</span>
                                        </li>
                                        <li>
                                            <StoriesShareIcon />
                                            <span>Share</span>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                        </section>
                    </div>
                </ModalBody>
                
            </Modal>
        </section>
    )
}

export default StoriesModal;