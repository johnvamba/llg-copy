import React from 'react';
import OffersPlus from '../../../svg/offers-plus';

const StoriesHeader = ({ title, setState }) => {
    return (
        <>
           <section className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <div className="flex flex-1">
                    <h1>{title}</h1>
                </div>
                <div className="flex flex-1 justify-end">
                    <button className="flex rounded-sm" onClick={() => setState(true)}>
                        <OffersPlus />
                        <span>Create Story</span>
                    </button>
                </div>
            </section>
    </>
    )
}

export default StoriesHeader;