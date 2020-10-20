import React from 'react';
import ListSingleStory from './list-single-story';

const List = ({ setShowViewStory }) => {
    return (
        <>
            <ListSingleStory setShowViewStory={setShowViewStory} />
        </>
    )
}

export default List;