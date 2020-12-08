import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthUserActions from '../redux/auth-user/actions';
import { Link, useLocation } from 'react-router-dom';
import OffersFormCross from '../svg/offers-form-cross';
import Organisation from '../svg/organisation';
import SidebarCampus from '../svg/sidebar-campus';
import './css/sidebar.css';

const Sidebar = ({ showSidebarMobile, setShowSidebarMobile }) => {
    const location = useLocation();
    const profile = useSelector(
        state => state.AuthUserReducer.profile
    );
    const roles = useSelector(
        state => state.AuthUserReducer.roles
    );

    const disptach = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get('/api/user/me');

            disptach(AuthUserActions.setProfile(data));
            disptach(AuthUserActions.setRoles(data.roles[0]));
        }

        fetchData();
    }, []);

    const [show, setShow] = useState({
        need: false,
        story: false,
        payment: false,
    });

    const handleOpen = (key) => {
        let list = { ...show };
        list[key] = !list[key];
        setShow(list);
    }

    return (
        <>
            <div className={`sidebar flex flex-shrink-0 flex-col w-64 border-r relative ${showSidebarMobile ? 'sidebar__mobile' : '' }`}>
                {
                    showSidebarMobile &&
                        <button className="sideBarMobile__close" type="button" onClick={() => setShowSidebarMobile(false)}>
                            <OffersFormCross />
                        </button>
                }
                <div className="px-8 py-3 text-white">
                    <div className="flex flex-row justify-center items-center my-4">
                        <img className="rounded-full h-12 w-12" src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" />

                        <div className="mx-4">
                            <p className="text-black text-sm mr-2 capitalize">{profile.name}</p>
                            <span className="text-gray-500 mr-2 text-xs">{profile.email}</span>
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

                    {
                        (roles.name === 'admin' || roles.name === 'campus admin') ? 
                        <div className="mt-6 text-gray-400">
                            <button
                                onClick={() => handleOpen('need')}
                                className={`relative w-full flex items-center focus:outline-none
                                ${(location.pathname == "/needs") || (location.pathname == "/needs/requests") ? "text-blue-400" : "text-gray-400"}`}
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
                                            Approved
                                        </Link>
                                    </div>

                                    <div
                                    className={`mt-4 
                                        ${location.pathname == "/needs/requests" ? "text-blue-400" : "text-gray-400"}`}
                                    >
                                        <Link to="/needs/requests">
                                            Requests
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                        : <div
                            className={`mt-6 
                                ${(location.pathname == "/needs") ? "text-blue-400" : "text-gray-400"}`}
                        >
                            <Link to="/needs" className="flex items-center">
                                <i className="text-xl fab fa-gratipay"></i>
                                <span className="px-4">Needs</span>
                            </Link>
                        </div>
                    }

                    

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/offers" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/offers" className="flex items-center">
                                    <i className="text-xl fas fa-hand-holding-heart"></i>
                                    <span className="px-4">Offers</span>
                                </Link>
                            </div>
                        )
                    }

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
                                        Published
                                    </Link>
                                </div>
                                <div
                                    className={`mt-4
                                    ${(location.pathname == "/stories/drafts") ? "text-blue-400" : "text-gray-400"}`}
                                >
                                    <Link to="/stories/drafts">
                                        Drafts
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/users" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/users" className="flex items-center">
                                    <i className="text-xl far fa-user"></i>
                                    <span className="px-4">Users</span>
                                </Link>
                            </div>
                        )
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                        ${location.pathname == "/groups" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/groups" className="flex items-center">
                                    <i className="text-xl fas fa-user-friends"></i>
                                    <span className="px-4">Groups</span>
                                </Link>
                            </div>
                        )
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/organizations" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/organizations" className="flex items-center">
                                    <Organisation />
                                    <span className="px-4">Organisations</span>
                                </Link>
                            </div>
                        )
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/campus" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/campus" className="flex items-center">
                                    <SidebarCampus />
                                    <span className="px-4">Campus</span>
                                </Link>
                            </div>
                        )
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/push-notifications" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/push-notifications" className="flex items-center">
                                    <i className="text-xl far fa-bell"></i>
                                    <span className="px-4">Push Notifications</span>
                                </Link>
                            </div>
                        )
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/transactions" ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Link to="/transactions" className="flex items-center">
                                    <i className="text-xl fas fa-retweet"></i>
                                    <span className="px-4">Transactions</span>
                                </Link>
                            </div>
                        )
                    }
                    

                    {roles.name === 'organization admin' &&
                        (
                        <div className="mt-6 text-gray-400">
                            <button
                                onClick={() => handleOpen('payment')}
                                className={`relative flex items-center focus:outline-none w-full
                                ${(location.pathname == "/payments") ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <i className="text-xl fas fa-leaf"></i>
                                <span className="px-4">Payments</span>

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

                            {show.payment &&
                                <div className={`ml-8`}>
                                    <div
                                        className={`mt-4
                                        ${(location.pathname == "/payments") ? "text-blue-400" : "text-gray-400"}`}
                                    >
                                        <Link to="/payments">
                                            Payment List
                                        </Link>
                                    </div>
                                    <div
                                        className={`mt-4
                                        ${(location.pathname == "/payments/receipt-templates") ? "text-blue-400" : "text-gray-400"}`}
                                    >
                                        <Link to="/payments/receipt-templates">
                                            Receipt Template
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                        )
                    }
                    {roles.name === 'organization admin' &&
                        <div
                            className={`mt-6 
                            ${location.pathname == "/api" ? "text-blue-400" : "text-gray-400"}`}
                        >
                            <Link to="/api" className="flex items-center">
                                <i className="text-xl fas fa-hand-holding-heart"></i>
                                <span className="px-4">API</span>
                            </Link>
                        </div>
                    }
                </nav>
            </div>
        </>
    )
}

export default Sidebar