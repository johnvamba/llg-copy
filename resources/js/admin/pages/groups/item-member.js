import React, { useState, useEffect } from 'react';

const ItemMember = ({ image, name, type = 'uninvited' }) => {
    const [sending, setSending] = useState(false)
    return <li>
        <div className="member-item">
            <img
                className="rounded-full"
                src={image || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}
            />
            <h4>{name}</h4>
            <button className={`invite-button`}>
                Invite
            </button>
        </div>
    </li>
}
export default ItemMember