import React, { useEffect, useState } from 'react';

const Needs = ({ data }) => {

    const dsplyProgress = (need) => {
        if (need.goal <= need.raised) {
            return 100;
        }

        return (need.raised * 100) / need.goal;
    }

    return data.map((need, index) => (
        <div key={need.title+'.'+index} className="flex flex-row px-8 py-6 border-b border-gray-200">
            <img
                className="h-20 w-20 rounded-lg"
                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
            />

            <div className="flex flex-col ml-2 w-full">
                <div className="flex flex-row">
                    <div className="flex-1 w-64">
                        <p className="text-sm pb-1">
                            {need.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {need.description}
                        </p>
                    </div>

                    <div className="flex flex-1 justify-end items-center">
                        <p className="px-4 rounded-full text-xs bg-blue-100 text-blue-400">
                            {need.type.name}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row mt-2 mb-1">
                    <div className="flex flex-1 flex-row">
                        <div className="flex-1">
                            <p className="text-xs text-gray-400">
                                2 days ago
                            </p>
                        </div>

                        <div className="flex flex-1 justify-end items-center">
                            <p className="font-thin text-xs text-gray-600">
                                Goal: ${need.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="flex-1 mt-1">
                        <div className="shadow w-full bg-gray-400 rounded-full">
                            <div className={`bg-blue-400 rounded-full leading-none py-1 text-white`} style={{ width: dsplyProgress(need) + '%' }}></div>
                        </div>
                    </div>

                    <div className="flex-initial flex-shrink-0 items-center">
                        <p className="text-xs text-blue-400 ml-2">{Math.ceil(dsplyProgress(need))}%</p>
                    </div>
                </div>
            </div>
        </div>
    ))
};

export default Needs;