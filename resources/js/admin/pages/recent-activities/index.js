import React from 'react';

const RecentActivities = () => {

    return (
        <aside className="flex flex-col border-l">
            <div className="pl-10 pt-4">
                <h1>Recent Activities</h1>
            </div>

            <div className="flex flex-col">
                <div className="w-32 flex justify-center bg-gray-200 rounded-br-full rounded-tr-full py-2 mt-4">
                    <p className="text-gray-600 text-sm">
                        Today
                    </p>
                </div>

                <div className="pl-6">
                    <div className="flex flex-row justify-center items-center">
                        <img className="rounded-full h-12 w-12" src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" />

                        <div className="m-4">
                            <p className="text-black mr-2 text-xs">
                                John Doe
                                <span className="text-gray-800"> donated 
                                    <span className="text-blue-400"> $500.00
                                    </span>
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">Just now</p>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <img className="rounded-full h-12 w-12" src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" />

                        <div className="m-4">
                            <p className="text-black mr-2 text-xs">
                                John Doe
                                <span className="text-gray-800"> donated 
                                    <span className="text-blue-400"> $500.00
                                    </span>
                                </span>
                            </p>
                            <p className="text-gray-500 text-xs">Just now</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default RecentActivities;