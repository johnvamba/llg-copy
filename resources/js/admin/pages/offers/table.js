import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
import { usePopper } from 'react-popper';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';
import { useSelector } from 'react-redux';

import { volunteer } from '../needs/categorylist';

const findCategory = (title = 'Employment') => volunteer.find(i=>i.name == title);

const RowTable = ({item, checkValue = false, checkChange, writeStory = ()=>{}, onShowInfo, popAction, handleForm, roles_name = ""}) => {
    const { title ="Untitled", type = "Employment", location = "N/A", status = "achieved", date = "Missing", photo = null} = item
    const cat = findCategory(type);
    const [approveElement, setApproveElement] = useState(null);
    const [rejectElement, setRejectElement] = useState(null);

    const switchStatus=()=>{
        switch(status){
            case 'approved':
            case 'achieved':
            case 'Achieved':
            return <span className="label label-success">Achieved</span>;
            case 'pending':
            case 'Pending':
            return <span className="label label-active">Pending</span>;
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
        <td className="title" onClick={onShowInfo}>
            <div className="flex items-center"> 
                {
                    photo ?
                    <img className="title-img" src={photo}/> :
                    <img className="title-img"/>
                }
                <span>
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
        {
            status == 'pending' &&
            <td>
                <div className="actions row-actions">
                    <button onClick={()=>popAction(approveElement, 'approve')}>
                        <i ref={setApproveElement}>
                        <Check />
                        </i>
                    </button>
                    <button onClick={()=>popAction(rejectElement, 'disapprove')}>
                        <i ref={setRejectElement}>
                        <Cross/>
                        </i>
                    </button>
                </div>
            </td>
        }
        {
            roles_name == 'organization admin' &&
            <td>
                <div className="actions row-actions">
                    <Button className="primary-btn flex text-white bg-blue-500 hover:bg-blue-600" 
                        onClick={(e)=>onShowInfo(e, false, false, false, true)}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9172 5.27255C11.7292 2.50805 9.81825 0.405049 8.8515 0.797299C7.20975 1.46555 9.8295 4.6703 1.76625 7.94705C1.0695 8.2313 0.893248 9.36305 1.185 10.041C1.476 10.7175 2.4285 11.3918 3.12525 11.109C3.246 11.0595 3.6885 10.917 3.6885 10.917C4.18575 11.5853 4.70625 11.1893 4.8915 11.613L5.76 13.608C5.92425 13.9845 6.29625 14.3333 6.56625 14.2305L8.10375 13.6463C8.45475 13.5128 8.538 13.1993 8.43075 12.9533C8.31525 12.687 7.84125 12.609 7.7055 12.2985C7.5705 11.9895 7.12875 10.995 7.002 10.6815C6.8295 10.2555 7.19625 9.9083 7.7295 9.85355C11.4 9.46955 12.0862 11.7375 13.3357 11.229C14.301 10.8353 14.1045 8.0348 12.9172 5.27255ZM12.504 9.75455C12.2887 9.8408 10.8442 8.70305 9.92175 6.5543C8.9985 4.40705 9.11475 2.4443 9.32925 2.35655C9.54375 2.2703 10.953 3.6443 11.8755 5.79155C12.7987 7.9388 12.7185 9.6668 12.504 9.75455Z" fill="white"/>
                        </svg>
                        Report Use
                    </Button>
                </div>
            </td>
        }
    </tr>
}

// Proper content
//Button Popper and action 
const ButtonPopper = ({buttonElement, actionClosure, btnAction, loading}) => {
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [togglePopper, setToggle] = useState(false);
    const [popContent, setContent] = useState('approval')

    const {styles, attributes} = usePopper(buttonElement, popperElement, {
        placement: 'bottom-end',
        className: 'arror',
        modifiers: [{name: 'arrow', options: {element: arrowElement } }],
    })

    return <div ref={setPopperElement} 
        className="action-content" 
        style={{...styles.popper, top:'10px', left: '0px', zIndex: 1}} 
        {...attributes.popper}>
        <div ref={setArrowElement} 
            className='action-arrow' 
            style={{...styles.arrow, left: '-8px'}} />
        {
            loading ? <div className="button-container">
                <p className="text-center mb-2">Loading...</p>
            </div> : 
            <div className="button-container">
                {
                    btnAction == 'approve' ?
                    <p className="text-center mb-2">Are you sure you want to approve this request?</p>
                    : <p className="text-center mb-2 text-red-400">Are you sure you want to reject this request?</p>
                }
                <div className="flex justify-between">
                    <Button onClick={()=>actionClosure(false)}>
                        No, Cancel
                    </Button>
                    <Button onClick={()=>actionClosure(true)}>
                        Yes
                    </Button>
                </div>
            </div>
        }
    </div>
}
//click on row shows popper
const OfferTable = ({tab = null, data = [], showInfo, loading = false, type='approved', loadTable})=> {
    const roles = useSelector(({AuthUserReducer}) => AuthUserReducer.roles);
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
            api.post(`/api/web/offers/${popped.id}/${action}`)
                .then(()=>{
                    loadTable(true);
                    swalSuccess(text);
                }).catch(()=>{
                    swalError()
                }).finally(()=>{
                    setPopLoading(false);
                })
            // alert("Do actions here "+ popped.id + " with settings "+ action)
        }
        //
        setPopItem(null)//close box
    }

    return <div>
    <table className="table">
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
                {
                    (type == "pending" || roles.name == 'organization admin') &&
                    <th className=''>Action</th>
                }
            </tr>
        </thead>
        <tbody>
            { loading ?
                <tr>
                    <td colSpan={type == 'pending' ? 7 : 6}>Loading data</td>
                </tr> :
                (
                    ( offers.length > 0 ) ? 
                    offers.map((i, ind) => <RowTable key={ind} 
                        tab={tab} 
                        item={i} 
                        checkValue={i.checked}
                        checkChange={e=>handleRowCheckbox(i,e.target.checked)}
                        onShowInfo={(e,a,b,c,d)=>showInfo(i,a,b,c,d)}
                        popAction={(button, type)=>togglePopItem(i, button, type)}
                        roles_name={roles.name}
                        />
                    ) :
                    <tr>
                        <td colSpan={type == 'pending' ? 7 : 6}>No data found</td>
                    </tr>
                )
            }
        </tbody>
    </table>
        {
            popped && 
            <ButtonPopper popped={popped} loading={popLoading} buttonElement={buttonElement} btnAction={action} actionClosure={executeButton}/>
        }
    </div>
    }
OfferTable.defaultProps = {
    type: 'approved',
    data: [], // rows
    loadTable: ()=>{
    }
}

export default OfferTable;