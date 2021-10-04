import React, { useState, useEffect } from 'react';
import Needs from './needs';
import OrganizationMembers from './members';
import MemberThumbnails from './member-thumbnails';

const OrgView = ({ data, closePanel , ...props }) => {
    const [activeNeeds, setActiveNeeds] = useState([]);
    const [pastNeeds, setPastNeeds] = useState([]);
    const [members, setMembers] = useState([]);
    const [tab, setTab] = useState('Active Needs');

    useEffect(() => {
        if (data && data.hasOwnProperty('id')) {
            async function getMembers(id) {
                let { data } = await axios.post(`/api/organization/${id}/members`);
                setMembers(data);
            }

            getMembers(data.id);
        }
    }, [])

    useEffect(() => {
        if (data && data.hasOwnProperty('id')) {
            async function fetchActiveNeeds(id) {
                let { data } = await axios.post(`/api/needs/organization/${id}`, {
                    type: 'active'
                });
                setActiveNeeds(data);
            }

            fetchActiveNeeds(data.id);
        }
    }, [])

    useEffect(() => {
        if (data && data.hasOwnProperty('id')) {
            async function fetchPastNeeds(id) {
                let { data } = await axios.post(`/api/needs/organization/${id}`, {
                    type: 'past'
                });
                setPastNeeds(data);
            }

            fetchPastNeeds(data.id);
        }
    }, [])

    const handleClose = () => {
        props.onHandleView(null);
    }

    const handleEdit = () => {
        props.onHandleView(null);
        window.location.href = `/admin/organisations/edit/${data.id}`;
    }

    return (
        <div className="flex flex-col w-full">
            <div>
                <div className="relative h-48 bg-blue-200 w-full">
                    <button
                        onClick={() =>closePanel()}
                        className="absolute right-0 top-10 mr-4 mt-8 bg-gray-600 rounded-full px-4 py-2 text-white focus:outline-none"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="relative p-8">
                    <img
                        className="absolute h-24 w-24 top-0 -mt-12 rounded-full shadow-lg border-white border"
                        src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                    />

                    <button
                        onClick={handleEdit}
                        className="absolute right-0 mr-6 text-blue-400 text-sm font-thin focus:outline-none"
                    >
                        <i className="fas fa-pen px-2"></i>
                        <span>Edit</span>
                    </button>
                </div>

                <div className="px-8 pb-6 pt-2">
                    <p className="pb-4">{data.name}</p>
                    {data.site &&
                        (<div className="flex items-center pb-4">
                            <i className="fas fa-globe text-gray-400 mr-4"></i>

                            <a className="text-sm text-blue-400" href={`https://${data.site}`} target="_blank">
                                {data.site}
                            </a>
                        </div>)
                    }

                    <div className="flex flex-row items-center space-x-4">
                        {data.phone_number &&
                            (<div className="flex items-center">
                                <i className="fas fa-phone-alt text-gray-400 mr-4"></i>
                                <span className="text-sm text-blue-400">
                                    {data.phone_number}
                                </span>
                            </div>)
                        }

                        {data.email &&
                            (<div className="flex items-center">
                                <i className="fas fa-envelope text-gray-400 mr-4"></i>

                                <a className="text-sm text-blue-400" href={`mailto:${data.email}`} target="_blank">
                                    {data.email}
                                </a>
                            </div>)
                        }
                    </div>

                    <p className="text-sm text-gray-600 font-thin py-4">
                        {data.description}
                    </p>

                    <MemberThumbnails
                        org={data.id}
                        members={members}
                    />
                </div>
            </div>

            <div className="flex flex-row border-b-2 border-gray-200">
                <div className={`flex flex-1 justify-center ${tab === "Active Needs" ? "border-b-4 border-blue-500" : ""}`}>
                    <button
                        onClick={() => setTab('Active Needs')}
                        className={`focus:outline-none py-4 text-xs ${tab === "Active Needs" ? "text-blue-400" : ""} `}
                    >
                        Active Needs ({activeNeeds.length || 0})
                    </button>
                </div>

                <div className={`flex flex-1 justify-center ${tab === "Past Needs" ? "border-b-4 border-blue-500" : ""}`}>
                    <button
                        onClick={() => setTab('Past Needs')}
                        className={`focus:outline-none py-4 text-xs ${tab === "Past Needs" ? "text-blue-400" : ""} `}
                    >
                        Past Needs ({pastNeeds.length || 0})
                    </button>
                </div>

                <div className={`flex flex-1 justify-center ${tab === "Members" ? "border-b-4 border-blue-500" : ""}`}>
                    <button
                        onClick={() => setTab('Members')}
                        className={`focus:outline-none py-4 text-xs ${tab === "Members" ? "text-blue-400" : ""} `}
                    >
                        Members ({members.length || 0})
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto">
                {tab === "Active Needs" &&
                    (
                        <Needs
                            data={activeNeeds || []}
                        />
                    )
                }

                {tab === "Past Needs" &&
                    (
                        <Needs
                            data={pastNeeds || []}
                        />
                    )
                }

                {tab === "Members" &&
                    (
                        <OrganizationMembers
                            members={members}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default OrgView