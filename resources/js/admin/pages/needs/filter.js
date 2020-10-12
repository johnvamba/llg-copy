import React, {useState} from 'react';

const NeedFilter = (props) => {
    console.log("Need Filter",props);
    return (
        <div className="filter-content filter-need" {...props}>
            Content here
        </div>
    )
}
export default NeedFilter;