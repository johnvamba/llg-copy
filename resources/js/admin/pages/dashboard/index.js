import React, { useState, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as DonationsActions from '../../../redux/donations/actions';
import Card from './card';
import NeedsOpen from './needs-open';
import NeedsMet from './needs-met';
import OffersHelp from './offers-help';
import Donations from './donations';
import UserMonitoring from './user-monitoring/';
import DonationGraph from './donation-graph';
import TopDonors from './top-donors';
import RecentNeeds from './recent-needs';
import NearbyOrganizations from './nearby-organizations';
import RecentActivities from '../recent-activities';
import '../organizations/organizations.css';
import OrganizationView from '../organizations/view';
import { usePopper } from 'react-popper';
import DashboardFilter from './filter'

let globalPicker = false;

const Dashboard = ({ ...props }) => {
    const roles = useSelector(state => state.AuthUserReducer.roles);
    const [filterElement, setFilterElement] = useState(null);
    const [toggleFilter, showFilter] = useState(false);
    const [picker, showPicker] = useState(false);
    // const [organization, setOrganization] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [options, setOptions] = useState({});
    const {styles, attributes} = usePopper(filterElement, popperElement, {
        placement: 'bottom-start',
        className: 'arror',
        modifiers: [{name: 'arrow', options: {element: arrowElement } }],
    })
    // if (roles.name !== 'admin') {
    //     window.location = '/admin';
    // }
    const close = (evt) => {
        if(popperElement && !popperElement.contains(evt.target)) {
            if(toggleFilter && globalPicker) {
                return;
            }
            document.removeEventListener('click', close);
            showFilter(false);
        }
    }

    useEffect(() => {
        if(!picker) {
            globalPicker = true
            setTimeout(()=>{
                globalPicker = false
            }, 500)
        } 
    }, [picker])

    useEffect(()=>{
        if(popperElement && toggleFilter) {
            document.addEventListener('click', close)
        } else {
            document.removeEventListener('click', close);
        }
    }, [toggleFilter, popperElement]);

    return (
        <>
            <div className="h-16 flex flex-row justify-between items-center border-b bg-white px-12">
                <div className="header-title flex flex-1">
                    <h1>Dashboard</h1>
                </div>
                <button ref={setFilterElement} onClick={e=>showFilter(!toggleFilter)} className="primary-btn page-header-btn flex rounded-sm px-4">
                    <span >Filter</span>
                </button>
                {
                    toggleFilter && <div ref={setPopperElement} 
                        className="filter-content" 
                        style={{...styles.popper, top:'15px', zIndex: 1}} 
                        {...attributes.popper}>
                        <div ref={setArrowElement} className='dbfilter-arrow' style={{...styles.arrow}} />
                        <DashboardFilter setPicker={showPicker} />
                    </div>
                }
            </div>
            <div className="component-body flex dashboard-body">
                
                <div className="w-full flex flex-col bg-gray-100 px-12 pt-8 pb-8">
                    <div className="flex flex-row space-x-6">
                        <NeedsOpen />

                        <NeedsMet />

                        <OffersHelp />

                        <Donations />
                    </div>

                    <div className="mt-8 w-full">
                        <div className="flex flex-row space-x-8">
                            <div className="flex-1">
                                <DonationGraph />
                            </div>

                            <div className="flex flex-initial flex-shrink-0 flex-col w-64">
                                {/*<UserMonitoring />*/}
                                <RecentNeeds />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pb-8 w-full">
                        <div className="flex flex-row">
                            <div className="flex flex-1 mr-4">
                                <NearbyOrganizations onViewOrganization={(org)=>setOrganization(org)} {...props} />
                            </div>

                            <div className="flex flex-1 ml-4">
                                <TopDonors />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                //     organization && <OrganizationView
                //     data={organization}
                //     closePanel={()=> setOrganization(null)}
                // />
            }
        </>
    )
}

export default Dashboard;