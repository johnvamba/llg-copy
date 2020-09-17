import React from 'react';

const Monitor = ({ title, total }) => {

    return (
        <div className="flex flex-row text-sm py-1">
            <div className="flex flex-1 text-left">
                <p className="text-gray-700">{title}</p>
            </div>
            <div className="flex flex-1 justify-end">
                <p>{total}</p>
            </div>
        </div>
    )
}

export default Monitor;