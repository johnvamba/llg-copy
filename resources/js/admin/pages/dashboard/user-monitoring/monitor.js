import React from 'react';

const Monitor = ({ title, total }) => {

    return (
        <div className="flex flex-row text-sm py-1">
            <div className="flex flex-1 text-left">
                <p className="user-monitoring__text">{title}</p>
            </div>
            <div className="flex flex-1 justify-end text-xs">
                <p className="user-monitoring__val">{total}</p>
            </div>
        </div>
    )
}

export default Monitor;