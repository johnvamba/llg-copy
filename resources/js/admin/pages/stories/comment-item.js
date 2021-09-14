import React, { useState } from 'react';

const CommentItem = ({comment = {}, onClicked = () => {} }) => {
	const [targetButton, setTargetButton] = useState(null)
	return <div className="comment-item">
        <img className="user-img" src={comment.userphoto || 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'}/>
        <div className="content-content">
            <h5>{comment.username || 'Unknown commentor'} <span>{comment.created_at}</span></h5>
            {
            	comment.is_hidden ? <p className="italic text-gray-400">-- Comment Hidden --</p>
            	: <p>{comment.comment}</p>
            }
        </div>
        <button ref={setTargetButton} onClick={() => onClicked(targetButton, comment)}>
            <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.6">
                    <circle cx="1.5" cy="1.5" r="1.5" fill="#4F6880"/>
                    <circle cx="6.9" cy="1.5" r="1.5" fill="#4F6880"/>
                    <circle cx="12.3" cy="1.5" r="1.5" fill="#4F6880"/>
                </g>
            </svg>
        </button>

    </div>
}
export default CommentItem;