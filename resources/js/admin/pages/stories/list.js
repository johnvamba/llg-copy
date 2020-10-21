import React from 'react';
import ListSingleStory from './list-single-story';

const List = ({ setShowViewStory }) => {
    return (
        <>
            <section className="stories__list">
                <ListSingleStory setShowViewStory={setShowViewStory} />
            </section>
        </>
    )
}

export default List;