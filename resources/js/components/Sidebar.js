import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const [show, setShow] = useState({
        need: false,
        story: false,
    });

    const handleOpen = (key) => {
        let list = { ...show };
        list[key] = !list[key];
        setShow(list);
    }

    return (
        <div className="flex flex-col w-64 border-r">
            <div className="px-8 py-3 text-white">
                <div className="flex flex-row justify-center items-center my-4">
                    <img className="rounded-full h-12 w-12" src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" />

                    <div className="mx-4">
                        <p className="text-black mr-2">John Doe</p>
                        <span className="text-gray-500 mr-2 text-xs">johndoe@gmail.com</span>
                    </div>
                </div>
            </div>

            <nav className="mx-6 text-sm">
                <div 
                    className={`mt-6 
                    ${location.pathname == "/dashboard" ? "text-blue-400" : "text-gray-400"}`}
                >
                    <Link to="/dashboard" className="flex items-center">
                        <i className="text-xl fa fa-th-large" aria-hidden="true"></i>
                        <span className="px-4">Dashboard</span>
                    </Link>
                </div>

                <div className="mt-6 text-gray-400">
                    <button onClick={() => handleOpen('need')} className="flex items-center focus:outline-none">
                        <i className="text-xl fa fa-heart" aria-hidden="true"></i>
                        <span className="px-4">Needs</span>
                    </button>

                    {show.need &&
                        <div className={`ml-8`}>
                            <div className="mt-4">
                                <Link to="/dashboard">
                                    Needs 1
                                </Link>
                            </div>

                            <div className="mt-4">
                                <Link to="/dashboard">
                                    Needs 2
                                </Link>
                            </div>
                        </div>
                    }
                </div>

                <div 
                    className={`mt-6 
                    ${location.pathname == "/offers" ? "text-blue-400" : "text-gray-400"}`}
                >
                    <Link to="/offers" className="flex items-center">
                        <i className="text-xl fa fa-th-large" aria-hidden="true"></i>
                        <span className="px-4">Offers</span>
                    </Link>
                </div>

                <div className="mt-6 text-gray-400">
                    <button onClick={() => handleOpen('story')} className="flex items-center focus:outline-none">
                        <i className="text-xl fa fa-heart" aria-hidden="true"></i>
                        <span className="px-4">Stories</span>
                    </button>

                    {show.story &&
                        <div className={`ml-8`}>
                            <div className="mt-4">
                                <Link to="/dashboard">
                                    Stories 1
                                </Link>
                            </div>

                            <div className="mt-4">
                                <Link to="/dashboard">
                                    Stories 2
                                </Link>
                            </div>
                        </div>
                    }
                </div>

                <div 
                    className={`mt-6 
                    ${location.pathname == "/users" ? "text-blue-400" : "text-gray-400"}`}
                >
                    <Link to="/users" className="flex items-center">
                        <i className="text-xl fa fa-user" aria-hidden="true"></i>
                        <span className="px-4">Users</span>
                    </Link>
                </div>

                <div 
                    className={`mt-6 
                    ${location.pathname == "/organizations" ? "text-blue-400" : "text-gray-400"}`}
                >
                    <Link to="/organizations" className="flex items-center">
                        <i className="text-xl fa fa-th-large" aria-hidden="true"></i>
                        <span className="px-4">Organisations</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar