import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthUserActions from '../redux/auth-user/actions';
import { Link, useLocation } from 'react-router-dom';
import OffersFormCross from '../svg/offers-form-cross';
import Organisation from '../svg/organisation';
import SidebarCampus from '../svg/sidebar-campus';
import './css/sidebar.css';

import {	
    Dashboard,
    Needs,
    Offers,
    Stories,
    Users,
    Groups,
    Organisations,
    Campus,
    PushNotifications,
    Transactions,
    Payments,
    Api
} from './helpers/sidebarIcons';


const Sidebar = ({ showSidebarMobile, setShowSidebarMobile }) => {
    const location = useLocation();
    const profile = useSelector(
        state => state.AuthUserReducer.profile
    );
    const roles = useSelector(
        state => state.AuthUserReducer.roles
    );

    const dispatch = useDispatch();
    const [show, setShow] = useState({
        need: false,
        story: false,
        offer: false,
        payment: false,
        organizations: false
    });

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get('/api/user/me');

            dispatch(AuthUserActions.setProfile(data));
            dispatch(AuthUserActions.setRoles(data.roles[0]));
            dispatch(AuthUserActions.setOrg((data.organization && data.organization.id) ? data.organization : null));
        }

        fetchData();
    }, []);

    // useEffect(()=>{
    //     if(location){

    //     }
    // }, [location])

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
                        ${location.pathname == "/dashboard" ? "text-yellow-400" : "text-gray-400"}`}
                    >
                        <Link to="/dashboard" className="flex items-center">
                            {/* <i className="text-xl fa fa-th-large" aria-hidden="true"></i> */}
                            <Dashboard active={location.pathname == "/dashboard" ? true : false} />
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
                                <Needs active={location.pathname == "/needs" ? true : false} />
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

                    { 
                        (roles.name === 'admin' || roles.name === 'campus admin') ?
                        <div className="mt-6 text-gray-400">
                            <button
                                onClick={() => handleOpen('offer')}
                                className={`relative w-full flex items-center focus:outline-none
                                ${(location.pathname == "/offer") || (location.pathname == "/offer/requests") ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Offers active={location.pathname == "/offers" ? true : false} />
                                <span className="px-4">Offers</span>


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

                            {show.offer &&
                                <div className={`ml-8`}>
                                    <div
                                        className={`mt-4 
                                        ${location.pathname == "/offers" ? "text-blue-400" : "text-gray-400"}`}
                                    >
                                        <Link to="/offers">
                                            Approved
                                        </Link>
                                    </div>

                                    <div
                                    className={`mt-4 
                                        ${location.pathname == "/offers/requests" ? "text-blue-400" : "text-gray-400"}`}
                                    >
                                        <Link to="/offers/requests">
                                            Requests
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div> :
                        <div
                            className={`mt-6 
                            ${location.pathname == "/offers" ? "text-yellow-400" : "text-gray-400"}`}
                        >
                            <Link to="/offers" className="flex items-center">
                                {/* <i className="text-xl fas fa-hand-holding-heart"></i> */}
                                <Offers active={location.pathname == "/offers" ? true : false} />
                                <span className="px-4">Offers</span>
                            </Link>
                        </div>
                    }

                    <div className="mt-6 text-gray-400">
                        <button
                            onClick={() => handleOpen('story')}
                            className={`relative flex items-center focus:outline-none w-full
                            ${(location.pathname == "/stories") ? "text-yellow-400" : "text-gray-400"}`}
                        >
                            {/* <i className="text-xl fas fa-leaf"></i> */}
                            <Stories active={location.pathname == "/stories" ? true : false} />
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
                                    ${(location.pathname == "/stories") ? "text-yellow-400" : "text-gray-400"}`}
                                >
                                    <Link to="/stories">
                                        Published
                                    </Link>
                                </div>
                                <div
                                    className={`mt-4
                                    ${(location.pathname == "/stories/drafts") ? "text-yellow-400" : "text-gray-400"}`}
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
                                ${location.pathname == "/users" ? "text-yellow-400" : "text-gray-400"}`}
                            >
                                <Link to="/users" className="flex items-center">
                                    {/* <i className="text-xl far fa-user"></i> */}
                                    <Users active={location.pathname == "/users" ? true : false} />
                                    <span className="px-4">Users</span>
                                </Link>
                            </div>
                        )
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                        ${location.pathname == "/groups" ? "text-yellow-400" : "text-gray-400"}`}
                            >
                                <Link to="/groups" className="flex items-center">
                                    {/* <i className="text-xl fas fa-user-friends"></i> */}
                                    <Groups active={location.pathname == "/groups" ? true : false} />
                                    <span className="px-4">Groups</span>
                                </Link>
                            </div>
                        )
                    }

                    { 
                        (roles.name === 'admin' || roles.name === 'campus admin') ?
                        <div className="mt-6 text-gray-400">
                            <button
                                onClick={() => handleOpen('organizations')}
                                className={`relative w-full flex items-center focus:outline-none
                                ${(location.pathname == "/organizations") || (location.pathname == "/organizations/requests") ? "text-blue-400" : "text-gray-400"}`}
                            >
                                <Organisations active={location.pathname == "/organizations" ? true : false} />
                                <span className="px-4">Organizations</span>


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

                            {show.organizations &&
                                <div className={`ml-8`}>
                                    <div
                                        className={`mt-4 
                                        ${location.pathname == "/organizations" ? "text-blue-400" : "text-gray-400"}`}
                                    >
                                        <Link to="/organizations">
                                            Approved
                                        </Link>
                                    </div>

                                    <div
                                    className={`mt-4 
                                        ${location.pathname == "/organizations/requests" ? "text-blue-400" : "text-gray-400"}`}
                                    >
                                        <Link to="/organizations/requests">
                                            Requests
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div> :
                        <div
                            className={`mt-6 
                            ${location.pathname == "/organizations" ? "text-yellow-400" : "text-gray-400"}`}
                        >
                            <Link to="/organizations" className="flex items-center">
                                <Organisations active={location.pathname == "/organizations" ? true : false} />
                                <span className="px-4">Organisations</span>
                            </Link>
                        </div>
                       
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/campus" ? "text-yellow-400" : "text-gray-400"}`}
                            >
                                <Link to="/campus" className="flex items-center">
                                    <Campus active={location.pathname == "/campus" ? true : false} />
                                    <span className="px-4">Location</span>
                                </Link>
                            </div>
                        )
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') && false &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/notifications" ? "text-yellow-400" : "text-gray-400"}`}
                            >
                                <Link to="/notifications" className="flex items-center">
                                    {/* <i className="text-xl far fa-bell"></i> */}
                                    <PushNotifications active={location.pathname == "/notifications" ? true : false} />
                                    <span className="px-4">Push Notifications</span>
                                </Link>
                            </div>
                        )
                    }

                    {(roles.name === 'admin' || roles.name === 'campus admin') &&
                        (
                            <div
                                className={`mt-6 
                                ${location.pathname == "/transactions" ? "text-yellow-400" : "text-gray-400"}`}
                            >
                                <Link to="/transactions" className="flex items-center">
                                    {/* <i className="text-xl fas fa-retweet"></i> */}
                                    <Transactions active={location.pathname == "/transactions" ? true : false} />
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
                                ${(location.pathname == "/payments") ? "text-yellow-400" : "text-gray-400"}`}
                            >
                                {/* <i className="text-xl fas fa-leaf"></i> */}
                                <Payments active={location.pathname == "/payments" ? true : false} />
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
                                        ${(location.pathname == "/payments") ? "text-yellow-400" : "text-gray-400"}`}
                                    >
                                        <Link to="/payments">
                                            Payment List
                                        </Link>
                                    </div>
                                    <div
                                        className={`mt-4
                                        ${(location.pathname == "/payments/receipt-templates") ? "text-yellow-400" : "text-gray-400"}`}
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
                            ${location.pathname == "/api" ? "text-yellow-400" : "text-gray-400"}`}
                        >
                            <Link to="/api" className="flex items-center">
                                {/* <i className="text-xl fas fa-hand-holding-heart"></i> */}
                                <Api active={location.pathname == "/api" ? true : false} />
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