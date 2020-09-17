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
                    <button
                        onClick={() => handleOpen('need')}
                        className={`relative w-full flex items-center focus:outline-none
                        ${(location.pathname == "/needs") || (location.pathname == "/needs/category") ? "text-blue-400" : "text-gray-400"}`}
                    >
                        <i className="text-xl fab fa-gratipay"></i>
                        <span className="px-4">Needs</span>

                        <div className="absolute inset-y-0 right-0 text-gray-400">
                            <svg
                                className="fill-current h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </button>

                    {show.need &&
                        <div className={`ml-8`}>
                            <div
                                className={`mt-4 
                                ${location.pathname == "/needs" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/needs">
                                    Contents
                                </Link>
                            </div>

                            <div
                                className={`mt-4 
                                ${location.pathname == "/needs/category" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/needs/category">
                                    Categories
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
                        <i className="text-xl fas fa-hand-holding-heart"></i>
                        <span className="px-4">Offers</span>
                    </Link>
                </div>

                <div className="mt-6 text-gray-400">
                    <button 
                        onClick={() => handleOpen('story')} 
                        className={`relative flex items-center focus:outline-none w-full
                        ${(location.pathname == "/stories") ? "text-blue-400" : "text-gray-400"}`}
                    >
                        <i className="text-xl fas fa-leaf"></i>
                        <span className="px-4">Stories</span>

                        <div className="absolute inset-y-0 right-0 text-gray-400">
                            <svg
                                className="fill-current h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </button>

                    {show.story &&
                        <div className={`ml-8`}>
                            <div 
                                className={`mt-4
                                ${(location.pathname == "/stories") ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/stories">
                                    Contents
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
                        <i className="text-xl far fa-user"></i>
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

                <div
                    className={`mt-6 
                    ${location.pathname == "/push-notifications" ? "text-blue-400" : "text-gray-400"}`}
                >
                    <Link to="/organizations" className="flex items-center">
                        <i className="text-xl far fa-bell"></i>
                        <span className="px-4">Push Notifications</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar