import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import Content from './content';
import OrganizationView from './pages/organizations/view';
import '../../assets/css/general.css';
import Filter from '../svg/filter';

import MainFilter from './filter'

const Home = () => {
    const [filterElement, setFilterElement] = useState(null);
    const [toggleFilter, showFilter] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        if("serviceWorker" in navigator){
            navigator.serviceWorker.addEventListener("message",
                ({ data }) => {
                    let {notification} = data;
                    setNotifications([...notifications, notification]);
                }
            );
        }
    }, [])

    const logout = async () => {
        if (Cookie.get("oToken_admin")) {
            Cookie.set("oToken_admin", "")
        } else if (Cookie.get("oToken_org_admin")) {
            Cookie.set("oToken_org_admin", "")
        }
        window.location = '/login';
    }

    const handleViewOrganization = value => {
        setOrganization(value)
    }

    return (
        <Router basename="/admin">
            <div className="flex min-h-screen">
                <Sidebar />

                <div className="flex flex-1 flex-col">
                    <header className="flex flex-rowl h-16 border-b">
                        <div className="flex items-center pl-12 filter-header">
                            <button className="text-black-500 flex items-center mr-4 focus:outline-none" 
                                onClick={e=>showFilter(!toggleFilter)}>
                                <i className="mr-4" ref={setFilterElement}>
                                    <Filter/>
                                </i>
                                Filter
                            </button>
                            {
                                toggleFilter &&
                                <MainFilter referElement={filterElement}/>
                            }
                        </div>
                        <div className="flex flex-1 items-center pl-2">
                            <button className="text-gray-500 mr-4 focus:outline-none">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                            <input
                                name="search"
                                placeholder="Search..."
                                className="w-64 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-1 justify-end items-center">
                            <button
                                className="bg-blue-100 rounded-full text-blue-400 focus:outline-none py-2 px-6 mr-6"
                            >
                                Admin
                            </button>
                            <div className="relative">
                                <Link className="mr-6 text-lg" to="/">
                                    <i className="far fa-bell"></i>
                                </Link>
                                {notifications.length > 0 && 
                                    (
                                        <div className="absolute top-0 right-0 mt-1 mr-6 p-1 rounded-full bg-blue-400"></div>
                                    )
                                }
                            </div>
                            <button className="mr-8 text-xl focus:outline-none" onClick={logout}>
                                <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
                            </button>
                        </div>
                    </header>

                    <div className="relative flex flex-row h-full">
                        <section className="flex w-full">
                            <Content onViewOrganization={handleViewOrganization} />
                        </section>

                        

                        {organization && <div className="absolute z-40 right-0 top-0 md:w-2/5 h-full flex bg-white border-l">
                            <OrganizationView
                                data={organization}
                                onHandleView={handleViewOrganization}
                            />
                        </div>}
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Home;