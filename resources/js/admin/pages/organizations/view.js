import React, { useState } from 'react';

const ViewOrganisation = () => {
    const [members, setMembers] = useState([]);

    return (
        <div className="flex flex-col w-full">
            <div className="relative h-48 bg-blue-200 w-full">
                <button
                    className="absolute right-0 top-10 mr-4 mt-8 bg-gray-600 rounded-full px-4 py-2 text-white focus:outline-none"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div className="relative p-8">
                <img
                    className="absolute h-24 w-24 top-0 -mt-12 rounded-full shadow-lg border-white border"
                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                />

                <button
                    className="absolute right-0 mr-6 text-blue-400 text-sm font-thin"
                >
                    <i class="fas fa-pen px-2"></i>
                    <span>Edit</span>
                </button>
            </div>

            <div className="px-8 pb-6 pt-2">
                <p className="pb-4">Organisation</p>
                <div className="flex items-center pb-4">
                    <i class="fas fa-globe text-gray-400 mr-4"></i>
                    <span className="text-sm text-blue-400">
                        www.organisation.com
                    </span>
                </div>

                <div className="flex flex-row items-center space-x-4">
                    <div className="flex items-center">
                        <i class="fas fa-phone-alt text-gray-400 mr-4"></i>
                        <span className="text-sm text-blue-400">
                            (02) 9876 5432
                        </span>
                    </div>

                    <div className="flex items-center">
                        <i class="fas fa-envelope text-gray-400 mr-4"></i>
                        <span className="text-sm text-blue-400">
                            organisation@gmail.com
                        </span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 font-thin py-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <div>
                    <p className="text-gray-700 font-thin text-sm pb-4">
                        Members (44)
                    </p>

                    <div className="flex flex-row">
                        <div className="flex flex-1 space-x-4">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                            />

                            <img
                                className="h-10 w-10 rounded-full"
                                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                            />

                            <img
                                className="h-10 w-10 rounded-full"
                                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                            />

                            <img
                                className="h-10 w-10 rounded-full"
                                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                            />

                            <img
                                className="h-10 w-10 rounded-full"
                                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                            />
                        </div>

                        <div className="flex flex-initial justify-end">
                            <button
                                className="border-2 border-blue-400 px-6 h-10 rounded-lg text-blue-400"
                            >
                                <i class="fas fa-plus mr-4"></i>
                                <span>Invite</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row border-b-2 border-gray-200">
                <div className="flex flex-1 justify-center border-b-4 border-blue-500">
                    <button
                        className="focus:outline-none py-4 text-xs text-blue-400"
                    >
                        Active Needs (1)
                    </button>
                </div>

                <div className="flex flex-1 justify-center">
                    <button
                        className="focus:outline-none py-4 text-xs"
                    >
                        Past Needs (1)
                    </button>
                </div>

                <div className="flex flex-1 justify-center">
                    <button
                        className="focus:outline-none py-4 text-xs"
                    >
                        Members (44)
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ViewOrganisation