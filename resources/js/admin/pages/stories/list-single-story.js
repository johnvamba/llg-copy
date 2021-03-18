import React from 'react';
import StoriesHeartIcon from '../../../svg/stories-heart';
import StoriesCommentIcon from '../../../svg/stories-comment';
import StoriesShareIcon from '../../../svg/stories-share';

const ListSingleStory = ({ set = [], handleForm }) => {
    return (
        <ul>
        {
            set.length > 0 && set.map((i, k)=>
                <li key={k} onClick={() => handleForm(i, false, true)}>
                    <div className="list-single-story__header">
                        <div className="list-single-story__rounded-img" style={{backgroundImage: `url(${i.org_photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} ></div>
                        <div style={{width: '300px'}}>
                            <h2>{i.org_name || 'Missing-Org-Name'}</h2>
                            <span>{i.date || 'Missing-date'}</span>
                            {
                                i.author_org && <span className="text-xs float-right">From Org</span>
                            }
                        </div>
                    </div>
                    <div className="list-single-story__body">
                        <div className="bg-cover bg-center" style={{backgroundImage: `url(${i.photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} ></div>
                        <div className="list-single-story__content">
                            <h3>{i.title || 'Missing-title'}</h3>
                            <p>{i.short_description || i.description || ''}</p>
                            <div className="list-single-story__footer">
                                <ul>
                                    <li>
                                        <StoriesHeartIcon />
                                        <span>{i.appreciates_count}</span>
                                    </li>
                                    <li>
                                        <StoriesCommentIcon />
                                        <span>{i.comments_count}</span>
                                    </li>
                                    <li>
                                        <StoriesShareIcon />
                                        <span>{i.shares_count}</span>
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