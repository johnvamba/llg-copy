import React from 'react';
import Sidebar from '../components/Sidebar';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import RecentActivities from './pages/recent-activities';
import Content from './content';

const Home = () => {

    const logout = async () => {
        if (Cookie.get("oToken_admin")) {
            Cookie.set("oToken_admin", "")
        } else if (Cookie.get("oToken_org_admin")) {
            Cookie.set("oToken_org_admin", "")
        }
        window.location = '/login';
    }

    return (
        <Router basename="/admin">
            <div className="h-screen flex">
                <Sidebar />
                
                <div className="flex flex-1 flex-col">
                    <header className="h-16 border-b flex flex-row">
                        <div className="flex flex-1 items-center pl-12">
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
                            <Link className="mr-6 text-lg" to="/admin/dashboard">
                                <i className="fa fa-bell" aria-hidden="true"></i>
                            </Link>
                            <button className="mr-8 text-xl focus:outline-none" onClick={logout}>
                                <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
                            </button>
                        </div>
                    </header>

                    <div className="flex flex-row h-full">
                        <section className="w-9/12">
                            <div className="h-16 flex jutify-center items-center pl-12 border-b">
                                <h1>Dashboard</h1>
                            </div>

                            <Content />
                        </section>

                        <RecentActivities />
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Home;