import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; 
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Cookie from 'js-cookie';
import Content from './content';
import { useSelector } from 'react-redux';
import OrganizationView from './pages/organizations/view';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/css/general.css';
// import '../../assets/css/update-12042020.css';
import Filter from '../svg/filter';
import MainFilter from './filter'

import SearchBar from '../components/SearchBar'
import SearchBarRedux from '../components/SearchBarRedux'
import RecentActivities from './pages/recent-activities';

const Home = () => {
    const [filterElement, setFilterElement] = useState(null);
    const [toggleFilter, showFilter] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);
    const [actPanel,showActPanel] = useState(false);
    const roles = useSelector(
        state => state.AuthUserReducer.roles
    );
    const windowWidth = window.innerWidth;

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
        api.post('/api/logout')
        .then(({ config })=>{
            //clear cache of data
            cache.store.clear();
        }).finally(()=>{
            if (Cookie.get("oToken_admin")) {
                Cookie.set("oToken_admin", "")
            } else if (Cookie.get("oToken_org_admin")) {
                Cookie.set("oToken_org_admin", "")
            }
            window.location = '/login';

        })

    }

    const handleHamburgerMenu = () => {
        setShowSidebarMobile(true);
    }

    const switchButton = () => {
        switch(roles.name){
            case 'admin':
            return 'Admin Portal';
            case 'campus admin':
            return 'Location Portal';
            case 'organization admin':
            default: 
            return "Organisation Portal";
        }
    }

    return (
        <Router basename="/admin">
            <div className="flex min-h-screen">
                {
                    (windowWidth > 1024 || showSidebarMobile ) && <Sidebar showSidebarMobile={showSidebarMobile} setShowSidebarMobile={setShowSidebarMobile} />
                }

                <div className="flex flex-1 flex-col w-full">
                    <header className="dashboard-header flex flex-rowl h-16 border-b">
                        {
                            !showSidebarMobile && 
                                <div className="dashboard-header__bars" onClick={handleHamburgerMenu}>
                                    <i className="fas fa-bars"></i>
                                </div>
                        }
                        <Route path={['/needs']} 
                            render={()=>
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
                                        <MainFilter referElement={filterElement} onClose={()=>showFilter(false)}/>
                                    }
                                </div>
                        }/>
                        <Switch>
                            <Route path={'/admin/dashboard'} exact component={()=><SearchBar/>} />
                            {/*As default*/}
                            <Route path={'*'} component={()=> <SearchBarRedux/>} />
                        </Switch>

                        <div className="flex flex-1 justify-end items-center">
                            <Link className="admin-mobile" to="/">
                                <i className="fas fa-user-cog"></i>
                            </Link>
                            <button className="admin-desktop bg-blue-100 rounded-full text-blue-400 focus:outline-none py-2 px-6 mr-6">{switchButton()}</button>
                            <div className="admin-notif relative">
                                <button className="mr-6 text-lg" onClick={()=>showActPanel(!actPanel)}>
                                    <i className="far fa-bell"></i>
                                </button>
                                {notifications.length > 0 && 
                                    (
                                        <div className="absolute top-0 right-0 mt-1 mr-6 p-1 rounded-full bg-blue-400"></div>
                                    )
                                }
                            </div>
                            <button className="admin-exit mr-8 text-xl focus:outline-none" onClick={logout}>
                                <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
                            </button>
                        </div>
                    </header>

                    <div className="relative flex flex-row h-full">
                        <section className="flex w-full">
                            <Content/>
                        </section>

                        { actPanel && <RecentActivities /> }

                        
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Home;