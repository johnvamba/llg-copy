import React, { useEffect, useState } from 'react';

const OrganizationMembers = ({ members }) => {

    return members.map((member, index) => (
        <div key={member.id} className="flex flex-row px-8 py-6 border-b border-gray-200">
            <img
                className="h-12 w-12 rounded-full"
                src={`http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp`}
            />

            <div className="flex flex-col justify-center ml-2 w-full">
                <p className="capitalize text-sm">
                    {member.model.name}
                </p>
            </div>
        </div>
    ))
};

export default OrganizationMembers;