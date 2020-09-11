import React from 'react';

const ListItem = ({
    avatar,
    avatarStyle,
    title,
    description,
    hightLightDescription,
    status,
    right,
    titleStyle,
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
                    <>
                        <p className={`mr-2 text-xs`}>
                            <span className={`${titleStyle}`}>{title}</span>

                            {description && 
                                <span className="text-gray-800 font-thin"> {description} 
                                    <span className="text-blue-400 font-semibold"> {hightLightDescription}
                                    </span>
                                </span>
                            }
                        </p>
                    </>

                    {status &&
                        <p className="text-gray-500 text-xs">{status}</p>
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