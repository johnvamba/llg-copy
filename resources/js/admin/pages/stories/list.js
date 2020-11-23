import React from 'react';
import ListSingleStory from './list-single-story';
import StoriesEmptyDraftsIcon from '../../../svg/stories-empty-drafts';

const List = ({ set=[], handleForm }) => {
	if(set.length <= 0)
		return <section className="component-body stories-drafts">
            <section className="stories-drafts__body">
                <div>
                    <StoriesEmptyDraftsIcon />
                    <div>
                        <span>No data to show</span>
                        <span>Would you like to <span onClick={() => handleForm({}, true)}>Add New Story?</span></span>
                    </div>
                </div>
            </section>
        </section>

    return (
        <section className="component-body stories__list">
            <ListSingleStory set={set} handleForm={handleForm} />
        </section>
    )
}

export default List;