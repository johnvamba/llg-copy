import React from 'react';
import StoriesHeartIcon from '../../../svg/stories-heart';
import StoriesCommentIcon from '../../../svg/stories-comment';
import StoriesShareIcon from '../../../svg/stories-share';

const ListSingleStory = ({ setShowViewStory }) => {
    return (
        <>
            <ul>
                <li onClick={() => setShowViewStory(true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img"></div>
                        <div>
                            <h2>Sample Title Here</h2>
                            <span>Aug 27, 2020</span>
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        {/* <div className="bg-cover bg-center h-100" style={{backgroundImage: "url(https://www.ratemds.com/blog/wp-content/uploads/2015/09/handshake-shaking-hands-shake-hands-trust.jpg)"}}></div> */}
                        <div className="bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                        <div className="list-single-story__content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="list-single-story__footer">
                                <ul>
                                    <li>
                                        <StoriesHeartIcon />
                                        <span>23,783</span>
                                    </li>
                                    <li>
                                        <StoriesCommentIcon />
                                        <span>21</span>
                                    </li>
                                    <li>
                                        <StoriesShareIcon />
                                        <span>14</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li onClick={() => setShowViewStory(true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img"></div>
                        <div>
                            <h2>Sample Title Here</h2>
                            <span>Aug 27, 2020</span>
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        <div className="bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                        <div className="list-single-story__content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="list-single-story__footer">
                                <ul>
                                    <li>
                                        <StoriesHeartIcon />
                                        <span>23,783</span>
                                    </li>
                                    <li>
                                        <StoriesCommentIcon />
                                        <span>21</span>
                                    </li>
                                    <li>
                                        <StoriesShareIcon />
                                        <span>14</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li onClick={() => setShowViewStory(true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img"></div>
                        <div>
                            <h2>Sample Title Here</h2>
                            <span>Aug 27, 2020</span>
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        <div className="bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                        <div className="list-single-story__content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="list-single-story__footer">
                                <ul>
                                    <li>
                                        <StoriesHeartIcon />
                                        <span>23,783</span>
                                    </li>
                                    <li>
                                        <StoriesCommentIcon />
                                        <span>21</span>
                                    </li>
                                    <li>
                                        <StoriesShareIcon />
                                        <span>14</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li onClick={() => setShowViewStory(true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img"></div>
                        <div>
                            <h2>Sample Title Here</h2>
                            <span>Aug 27, 2020</span>
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        <div className="bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                        <div className="list-single-story__content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="list-single-story__footer">
                                <ul>
                                    <li>
                                        <StoriesHeartIcon />
                                        <span>23,783</span>
                                    </li>
                                    <li>
                                        <StoriesCommentIcon />
                                        <span>21</span>
                                    </li>
                                    <li>
                                        <StoriesShareIcon />
                                        <span>14</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li onClick={() => setShowViewStory(true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img"></div>
                        <div>
                            <h2>Sample Title Here</h2>
                            <span>Aug 27, 2020</span>
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        <div className="bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                        <div className="list-single-story__content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="list-single-story__footer">
                                <ul>
                                    <li>
                                        <StoriesHeartIcon />
                                        <span>23,783</span>
                                    </li>
                                    <li>
                                        <StoriesCommentIcon />
                                        <span>21</span>
                                    </li>
                                    <li>
                                        <StoriesShareIcon />
                                        <span>14</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li onClick={() => setShowViewStory(true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img"></div>
                        <div>
                            <h2>Sample Title Here</h2>
                            <span>Aug 27, 2020</span>
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        <div className="bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                        <div className="list-single-story__content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="list-single-story__footer">
                                <ul>
                                    <li>
                                        <StoriesHeartIcon />
                                        <span>23,783</span>
                                    </li>
                                    <li>
                                        <StoriesCommentIcon />
                                        <span>21</span>
                                    </li>
                                    <li>
                                        <StoriesShareIcon />
                                        <span>14</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li onClick={() => setShowViewStory(true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img"></div>
                        <div>
                            <h2>Sample Title Here</h2>
                            <span>Aug 27, 2020</span>
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        <div className="bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                        <div className="list-single-story__content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</p>
                            <div className="list-single-story__footer">
                                <ul>
                                    <li>
                                        <StoriesHeartIcon />
                                        <span>23,783</span>
                                    </li>
                                    <li>
                                        <StoriesCommentIcon />
                                        <span>21</span>
                                    </li>
                                    <li>
                                        <StoriesShareIcon />
                                        <span>14</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default ListSingleStory;