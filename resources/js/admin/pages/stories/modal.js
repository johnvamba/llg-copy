import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StoriesHeartIcon from '../../../svg/stories-heart';
import StoriesCommentIcon from '../../../svg/stories-comment';
import StoriesShareIcon from '../../../svg/stories-share';
import StoriesNoImageIcon from '../../../svg/preview-no-image';
import StoriesPublishIcon from '../../../svg/stories-publish';

const StoriesModal = ({modal, toggle}) => {

    return (
        <>
            <section className="story-preview">
                <Modal isOpen={modal} toggle={toggle} className="story-preview__modal">
                    <ModalBody>
                        <div className="flex">
                            <section className="w-1/2 story-preview__modal-left">
                                <h2>Preview</h2>
                                <form>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none" type="text" placeholder="Long Title Here" />
                                    </div>
                                    <div className="create-story__wysiwyg form-group">
                            
                                    </div>
                                </form>
                                <section className="story-preview__modal-footer">
                                    <div className="story-preview__modal-footer-container">
                                        <button className="publish">
                                            <span>Publish</span>
                                            <StoriesPublishIcon />
                                        </button>
                                        <div>
                                            <button className="discard" onClick={toggle}>
                                                Close Preview
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </section>
                            <section className="w-1/2 story-preview__modal-right">
                                <div>
                                    <StoriesNoImageIcon />
                                    <div className="content">
                                        <div className="tags">
                                            <span>#tagging</span>
                                            <span>#tag</span>
                                        </div>
                                        <h2>Long Title Here</h2>
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
                                                <label>Dwight Navarro</label>
                                            </div>
                                        </div>
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Diam donec adipiscing tristique risus nec feugiat. Sit amet nisl suscipit adipiscing bibendum est. Quis viverra nibh cras pulvinar. Tempor orci dapibus ultrices in iaculis nunc sed augue. Tristique magna sit amet purus. Donec et odio pellentesque diam volutpat. Turpis massa sed elementum tempus. Enim facilisis gravida neque convallis a cras semper auctor. Vel pretium lectus quam id leo in vitae turpis. Malesuada fames ac turpis egestas sed tempus urna et.
                                            </p>
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
        </>
    )
}

export default StoriesModal;