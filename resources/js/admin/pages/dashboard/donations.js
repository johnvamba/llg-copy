import React from 'react';

const Donations = ({
    title,
    amount,
    percentage
}) => {

    return (
        <div className="flex flex-1 flex-col px-6 pb-10 pt-8 sm:border-b border-r">
            <p className="text-gray-500 text-xs">{title}</p>
            <p className="flex items-center text-3xl">
                ${amount}

                {percentage &&
                    <span className="bg-green-400 text-white text-xs px-2 py-1 ml-4 rounded-md">
                        +{percentage}%
                    </span>
                }
            </p>
        </div>
    )
}

export default Donations;