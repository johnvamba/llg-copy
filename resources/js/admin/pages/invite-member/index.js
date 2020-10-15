import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

const InviteMember = () => {
    const [searchName, setSearchName] = useState(null);
    const [users, setUsers] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        async function fecthData(id, searchName) {
            let {data} = await axios.post('/api/organization-members/uninvited', {
                    organization_id: id,
                    name: searchName
                });
            setUsers(data);
        }

        fecthData(id, searchName);
    }, [searchName]);

    const handleInvite = async (user, index) => {
        let {data} = await axios.post('/api/organization-members', {
                organization_id: id,
                user: user
            });
    }

    const handleSearch = (e) => {
        setSearchName(e.target.value);
    }

    return (
        <div className="p-12">
            <p className="text-gray-600 tracking-wide mb-10">
                Invite Member's
            </p>

            <input
                type="search"
                value={searchName || ``}
                placeholder="Search name..."
                className="focus:outline-none border px-2 py-1 rounded-sm"
                onChange={handleSearch}
            />

            <div className={`${users.length > 0 ? "" : "h-64"} bg-white border mt-4 rounded-lg`}>
                {users.length === 0 &&
                    (
                        <div className="flex justify-center items-center">
                            <p className="text-gray-600 text-sm">
                                Users not found.
                            </p>
                        </div>
                    )
                }
                <div className="flex flex-row flex-wrap grid grid-cols-4 gap-2 p-2">
                    {users.map((user, index) => (
                        <div key={user.id} className="flex p-2 border rounded-lg">
                            <img
                                className="h-16 w-16 rounded-lg mr-2"
                                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
                            />

                            <div className="flex flex-col">
                                <p className="text-sm text-gray-dark capitalize">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-600 truncate">
                                    {user.profile.location}
                                </p>
                                <div>
                                    <button 
                                        onClick={() => handleInvite(user.id, index)}
                                        className="text-xs border border-blue-400 text-blue-400 text-sm px-8 rounded-lg"
                                    >
                                        Invite
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InviteMember;