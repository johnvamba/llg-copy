import React from 'react';

const Card = ({
    title,
    amount,
    percentage
}) => {

    return (
        <div 
            className={`top-cards flex flex-1 flex-col justify-center bg-white px-4 py-8 w-20 border rounded-lg`}
        >
            <p className="flex items-center">
                {amount}
            </p>
            <p className="text-gray-500 capitalize truncate text-xs">{title}</p>
        </div>
    )
}

export default Card;