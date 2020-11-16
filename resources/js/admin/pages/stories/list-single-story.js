import React from 'react';
import StoriesHeartIcon from '../../../svg/stories-heart';
import StoriesCommentIcon from '../../../svg/stories-comment';
import StoriesShareIcon from '../../../svg/stories-share';

const ListSingleStory = ({ set = [], handleForm }) => {
    return (
        <ul>
        {
            set.length > 0 && set.map((i, k)=>
                <li key={k} onClick={() => handleForm(i, true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img"></div>
                        <div>
                            <h2>{i.title || 'Missing-title'}</h2>
                            <span>{i.date || 'Missing-date'}</span>
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        {/* <div className="bg-cover bg-center h-100" style={{backgroundImage: "url(https://www.ratemds.com/blog/wp-content/uploads/2015/09/handshake-shaking-hands-shake-hands-trust.jpg)"}}></div> */}
                        <div className="bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                        <div className="list-single-story__content">
                            <p>{i.short_description || i.description || ''}</p>
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
            ) 
        }
        </ul>
    )
}

export default ListSingleStory;