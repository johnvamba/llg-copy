import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
import { usePopper } from 'react-popper';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';

import { volunteer } from '../needs/categorylist';
const findCategory = (title = 'Employment') => volunteer.find(i=>i.name == title);

const RowTable = ({item, checkValue = false, checkChange, writeStory = ()=>{}, onShowInfo, popAction}) => {
    const { title ="Untitled", type = "Employment", location = "N/A", status = "achieved", date = "Missing"} = item
    const cat = findCategory(type);
    const [approveElement, setApproveElement] = useState(null);
    const [rejectElement, setRejectElement] = useState(null);

    const switchStatus=()=>{
        switch(status){
            case 'achieved':
            case 'Achieved':
            return <span className="label label-success">Achieved</span>;
            case 'pending':
            case 'pending':
            return <span className="label label-active">On-Going</span>;
            case 'denied':
            case 'Denied':
            return <span className="label label-pending">Denied</span>;
            default:
            return <span className="label label-secondary">Unknown</span>;
        }
    }

    return <tr>
        <td className="checkbox">
            <input type='checkbox' checked={checkValue} onChange={checkChange}/>
        </td>
        <td className="title">
            <div className="flex"> 
                <img className="title-img" />
                <span onClick={onShowInfo}>
                    { title }
                </span>
            </div>
        </td>
        <td>
            {
                cat && <div className="tos flex items-center">
                    <cat.svg_class />
                    <p className="ml-2">{type}</p>
                </div>
            }
        </td>
        <td className="location">
            <div>
                <p>
                { location }
                </p>
            </div>
        </td>
        <td>
            { switchStatus() }
        </td>
        <td>
            <p>{ date }</p>
        </td>
    </tr>
}

// Proper content
//click on row shows popper
const OfferTable = ({tab = null, data = [], showInfo, loading = false, loadTable})=> {
    const [checkAll, setCheckAll] = useState(false)
    const [offers, setOffers] = useState([])
    const [popped, setPopItem] = useState(null)
    const [popLoading, setPopLoading] = useState(false)
    const [buttonElement, setButton] = useState(null)
    const [action, setAction] = useState('approve')

    useEffect(() => {
        setOffers(data)    
    }, [ data ])

    const handleRowCheckbox = (item, input)=>{
        setCheckAll(false)
        item.checked = input;
        setOffers(offers.map(i => i.id == item ? item : i))
    }

    const handleCheckAll = ()=>{
        setCheckAll(!checkAll)

        setOffers(offers.map(i=> {
            i.checked = !checkAll;
            return i;
        }))
    }

    const togglePopItem = (item, button, type ='reject', clicked)=>{
        setAction(type)
        setPopItem(item)
        setButton(button)
    }

    //Execute button activity here
    const executeButton = (execute)=>{
        //do axios here based on settings
        if(execute){
            const text = action == 'approve' ? "You successfully created offer" : "Cancel"
            // return;
            setPopLoading(true)
            // api.post(`/api/web/needs/${popped.id}/${action}`)
            //     .then(()=>{
            //         loadTable(true);
                    swalSuccess(text);
                // }).catch(()=>{
                //     swalError()
                // }).finally(()=>{
                    setPopLoading(false);
                // })
            // alert("Do actions here "+ popped.id + " with settings "+ action)
        }
        //
        setPopItem(null)//close box
    }

    return <table className="table">
        <thead className="bg-white tb-head">
            <tr>
                <th className="checkbox">
                    <input type='checkbox' checked={checkAll} onChange={e=>handleCheckAll(e.target.checked)}/>
                </th>
                <th className="title">Title</th>
                <th className="">Type of Service</th>
                <th className="">Location</th>
                <th className="">Status</th>
                <th className="">Date Added</th>
            </tr>
        </thead>
        <tbody>
            { loading ?
                <tr>
                    <td colSpan={6}>Loading data</td>
                </tr> :
                (
                    ( offers.length > 0 ) ? 
                    offers.map((i, ind) => <RowTable key={ind} 
                        tab={tab} 
                        item={i} 
                        checkValue={i.checked}
                        checkChange={e=>handleRowCheckbox(i,e.target.checked)}
                        onShowInfo={()=>showInfo(i)}
                        popAction={(button, type)=>togglePopItem(i, button, type)}/>
                    ) :
                    <tr>
                        <td colSpan={6}>No data found</td>
                    </tr>
                )
            }
        </tbody>
    </table>
    }
OfferTable.defaultProps = {
    type: 'approved',
    data: [], // rows
    loadTable: ()=>{
    }
}

export default OfferTable;