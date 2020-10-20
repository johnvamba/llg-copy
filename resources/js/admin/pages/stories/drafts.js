import React from 'react';
import OffersPlus from '../../../svg/offers-plus';
import StoriesEmptyDraftsIcon from '../../../svg/stories-empty-drafts';

const Drafts = () => {
    return (
        <>
            <section className="stories-drafts">
                <header className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                    <div className="flex flex-1">
                        <h1>drafts (0)</h1>
                    </div>
                    <div className="flex flex-1 justify-end">
                        <button className="flex rounded-sm">
                            <OffersPlus />
                            <span>Create Story</span>
                        </button>
                    </div>
                </header>
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