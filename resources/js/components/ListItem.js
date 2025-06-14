import React from 'react';

const ListItem = ({
    avatar,
    avatarStyle,
    title,
    titleStyle,
    description,
    descriptionStyle,
    shortDescription,
    status,
    statusStyle,
    right,
    containerSyle,
}) => {
    
    return (
        <div className={`flex flex-row flex-wrap my-4 ${containerSyle}`}>
            <div className="flex flex-1">
                {avatar && 
                    <img 
                        className={`rounded-full ${avatarStyle}`} 
                        src={avatar} 
                    />}

                <div className="ml-4 flex flex-col justify-center">
                    <p className={` mr-2`}>
                        <span className={`recent-added-needs-title ${titleStyle}`}>{title}</span>

                        {description && 
                            <span className={`text-gray-800 font-thin`}> {description} 
                                <span className="text-yellow-600 font-semibold"> {shortDescription}
                                </span>
                            </span>
                        }
                    </p>

                    {status &&
                        <p className={`recent-added-needs-status capitalize`}>
                            {status}
                        </p>
                    }
                </div>
            </div>

            {right && 
                <div className="flex flex-initial items-center">
                    {right}
                </div>
                }
        </div>
    )
}

export default ListItem;