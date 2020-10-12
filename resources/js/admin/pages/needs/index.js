import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as NeedsActions from '../../../redux/needs/actions';
import DataTable from '../../../components/layout/DataTable';
import Button from '../../../components/Button';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
//As test icon only
import IconTest from '../../../svg/icon-test'

import './needs.css';

import NeedForm from './form'

const Needs = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [tab, setTab] = useState('all'); //current or past
    const [form, showForm] = useState(false); //false
    const needs = useSelector(
        state => state.NeedsReducer.needs
    )

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.post('/api/need/lists', {
                'limit': limit
            });

            dispatch(NeedsActions.setNeeds(data));
        }

        fetchData();
    }, [limit])

    const handleLimitChange = (limit) => {
        setLimit(parseInt(limit));
    }

    const handleChangePage = (page) => {
        setPage(parseInt(page));
    }
    const handleTab = (tab = 'all')=>{
        //change content of table here
        setTab(tab)
    }

    const handleForm = (form = false, setting = null)=>{
        //change content of table here
        if(setting == 'discard'){
            //discard Changes here
        }
        if(setting == 'submit'){
            //discard Changes here
        }
        showForm(form)
    }

    return (
        <>
            <div className="h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                <ul className="nav-tab">
                    <li className={`nav-tab-item ${tab=='all' ? 'active' : ''}`} onClick={()=>handleTab('all')}>All ({ needs.all || 0 })</li>
                    <li className={`nav-tab-item ${tab=='current' ? 'active' : ''}`} onClick={()=>handleTab('current')}>Current ({ needs.current || 0 })</li>
                    <li className={`nav-tab-item ${tab=='past' ? 'active' : ''}`} onClick={()=>handleTab('past')}>Past ({ needs.past || 0 })</li>
                </ul>
                <Button className="ml-auto text-white bg-blue-500 hover:bg-blue-600" onClick={()=>showForm(true)}>
                    <i className="fas fa-plus pr-2"></i>
                    <span>Create Need</span>
                </Button>
            </div>

            <div className="flex flex-col p-8">
                <table className="table">
                    <thead className="bg-white tb-head">
                        <tr>
                            <th className="w-1/14">
                                <input type='checkbox'/>
                            </th>
                            <th className="w-3/14">Title</th>
                            <th className="w-1/7">Type of Need</th>
                            <th className="w-1/7">Goal</th>
                            <th className="w-1/7">Status</th>
                            <th className="w-1/7">Date Added</th>
                            <th className="w-1/7">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type='checkbox'/>
                            </td>
                            <td className="title">
                                <div className="title-img"></div>
                                <p>
                                    title
                                </p>
                            </td>
                            <td>
                                Donation
                            </td>
                            <td className="col-currency">
                                {
                                    (true) ? ( <p><span className="currency">$</span>25.00</p>) : <p>N/A</p>
                                }
                            </td>
                            <td>
                                <span className="label label-active">On-Going</span>
                            </td>
                            <td>
                                08/27/2020
                            </td>
                            <td className="row-actions">
                            <Button>
                                
                                <Check/>
                            </Button>
                            <Button>
                                
                                <Cross/>
                            </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type='checkbox'/>
                            </td>
                            <td className="title">
                                <div className="title-img"></div>
                                <p>
                                    title
                                </p>
                            </td>
                            <td>
                                Donation
                            </td>
                            <td className="col-currency">
                                {
                                    (true) ? ( <p><span className="currency">$</span>25.00</p>) : <p>N/A</p>
                                }
                            </td>
                            <td>
                                <span className="label label-pending">Pending</span>
                            </td>
                            <td>
                                08/27/2020
                            </td>
                            <td className="row-actions">
                                <Button className="flex text-white bg-blue-500 hover:bg-blue-600">
                                <Quill/>
                                Write a Story
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type='checkbox'/>
                            </td>
                            <td className="title">
                                <div className="title-img"></div>
                                <p>
                                    title
                                </p>
                            </td>
                            <td>
                                Donation
                            </td>
                            <td className="col-currency">
                                {
                                    (true) ? ( <p><span className="currency">$</span>25.00</p>) : <p>N/A</p>
                                }
                            </td>
                            <td>
                                <span className="label label-success">Achieved</span>
                            </td>
                            <td>
                                08/27/2020
                            </td>
                            <td className="row-actions">
                                <Button className="flex text-white bg-blue-500 hover:bg-blue-600">
                                <Quill/>
                                Write a Story
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {
                form && 
                <NeedForm handleForm={handleForm}/>
            }
        </>
    )
}

export default Needs;