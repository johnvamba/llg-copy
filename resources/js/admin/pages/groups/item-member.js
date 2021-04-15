import React, { useState, useEffect } from 'react';

const ItemMember = ({ id, photo, name, invite_status = 'uninvited', handleInvite }) => {
    const [sending, setSending] = useState(false)
    const switchButton = ()=>{
        switch(invite_status){
            case 'approved':
            return <button className={`invite-button invited`} disabled={true}>
                Approved
            </button>
            case 'pending':
            return <button className={`invite-button invited`} disabled={true}>
                Invited
            </button>
            case 'denied':
            return <button className={`invite-button denied`} disabled={true}>
                Denied
            </button>
            case 'sending':
            return <button className={`invite-button`} disabled={true}>
                Sending...
            </button>
            case 'tobesent':
            return <button className={`invite-button`} disabled={true} title="To be sent after creating group process">
                To be Sent*
            </button>
            case 'uninvited':
            default:
            return <button className={`invite-button`} onClick={()=>handleInvite({id, name, invite_status, photo})}>
                Invite
            </button>
        }
    }
    return <li>
        <div className="member-item">
            <img
                className="rounded-full"
                src={photo || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}
            />
            <h4>{name}</h4>
            {switchButton()}
        </div>
    </li>
}
export default ItemMember