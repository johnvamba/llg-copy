import React from 'react';
import { NavLink } from 'react-router-dom'

const MemberThumbnails = ({ org, members = [] }) => {
    return (
        <div>
            <p className="text-gray-700 font-thin text-sm mb-3">
                Members ({members.length})
            </p>

            <div className="flex flex-row">
                <div className="flex flex-1 flex-wrap">
                    {
                        members.slice(0, 5).map((member, index) => {

                            return (
                                <img
                                    key={member.id}
                                    className="h-10 w-10 rounded-full mr-4 my-1"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                />
                            )
                        })

                    }

                    {
                        members.length > 5 &&
                        (
                            <div className="relative">
                                <img
                                    className="h-10 w-10 rounded-full my-1"
                                    src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                                />

                                <span className="absolute top-0 mt-3 ml-3">
                                    <i className="text-sm fas fa-ellipsis-h"></i>
                                </span>
                            </div>
                        )
                    }
                </div>

                <div className="flex flex-initial justify-end items-center">
                    <NavLink to={`/organizations/${org}/invite`}>
                        <button
                            className="border-2 border-blue-400 px-6 h-10 rounded-lg text-blue-400"
                        >
                            <i className="fas fa-plus mr-4"></i>
                            <span>Invite</span>
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default MemberThumbnails;