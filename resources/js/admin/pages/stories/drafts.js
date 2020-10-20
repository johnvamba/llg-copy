import React from 'react';
import StoriesEmptyDraftsIcon from '../../../svg/stories-empty-drafts';
import StoriesHeader from './header';

const Drafts = ({ setShowCreateStory }) => {
    return (
        <>
            <section className="stories-drafts">
                <section className="stories-drafts__body">
                    <div>
                        <StoriesEmptyDraftsIcon />
                        <div>
                            <span>No data to slhow</span>
                            <span>Would you like to <span>Add New Story?</span></span>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Drafts;