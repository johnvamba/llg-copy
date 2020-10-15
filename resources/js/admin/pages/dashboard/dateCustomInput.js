import React, { forwardRef } from 'react';

const DateCustomInput = (props, ref) => {
    const {value, onClick} = props;

    return (
        <button ref={ref} className="example-custom-input text-blue-400 focus:outline-none" onClick={onClick}>
            {value}
            <span className="text-black pl-2">
                <i className="fas fa-angle-down"></i>
            </span>
        </button>
    )
};

export default forwardRef(DateCustomInput);