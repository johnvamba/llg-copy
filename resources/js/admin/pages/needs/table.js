import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
import { usePopper } from 'react-popper';

const RowTable = ({item, checkValue = false, checkChange, writeStory = ()=>{}, onShowInfo, popAction}) => {
    const { title ="Untitled", type = "Donation", goal = "N/A", status = "achieved", date = "Missing"} = item
    const [approveElement, setApproveElement] = useState(null);
    const [rejectElement, setRejectElement] = useState(null);

    const switchStatus=()=>{
        switch(status){
            case 'achieved':
            return <span className="label label-success">Achieved</span>;
            case 'on-going':
            return <span className="label label-active">On-Going</span>;
            case 'pending':
            return <span className="label label-pending">Pending</span>;
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
                <p onClick={onShowInfo}>
                    { title }
                </p>
            </div>
        </td>
        <td>
            { type }
        </td>
        <td className="col-currency">
            {
                (goal !== "N/A") ? ( <p><span className="currency">$</span>{parseFloat(goal).toFixed(2)}</p>) : <p>N/A</p>
            }
        </td>
        <td>
            { switchStatus() }
        </td>
        <td>
            { date }
        </td>
        {
            status == 'pending' ?
            <td className="actions row-actions">
                <button onClick={()=>popAction(approveElement, 'approve')}>
                    <i ref={setApproveElement}>
                    <Check />
                    </i>
                </button>
                <button onClick={()=>popAction(rejectElement, 'reject')}>
                    <i ref={setRejectElement}>
                    <Cross/>
                    </i>
                </button>
            </td> :
            <td className="actions row-actions">
                <Button className="flex text-white bg-blue-500 hover:bg-blue-600" 
                    disabled={status !== 'achieved'}
                    onClick={()=>alert('open form from stories')}>
                    <Quill/>
                    Write a Story
                </Button>
            </td>
        }
    </tr>
}
//Button Popper and action 
const ButtonPopper = ({buttonElement, actionClosure, btnAction}) => {
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
        <div className="button-container">
            {
                btnAction == 'approve' ?
                <p className="text-center mb-2">Are you sure you want to approve this request?</p>
                : <p className="text-center mb-2 text-red-400">Are you sure you want to reject this request?</p>
            }
            <div className="flex justify-between">
                <Button className="text-white bg-gray-300 hover:bg-gray-500" onClick={()=>actionClosure(false)}>
                    Cancel
                </Button>
                <Button className="text-white bg-blue-500 hover:bg-blue-600" onClick={()=>actionClosure(true)}>
                    Yes
                </Button>
            </div>
        </div>
    </div>
}

// Proper content
//click on row shows popper
const NeedTable = ({tab = null, data = [], showInfo})=> {
    const [checkAll, setCheckAll] = useState(false)
    const [needs, setNeeds] = useState(data)
    const [popped, setPopItem] = useState(null)
    const [buttonElement, setButton] = useState(null)
    const [action, setAction] = useState('approve')

    const handleRowCheckbox = (item, input)=>{
        setCheckAll(false)
        item.checked = input;
        setNeeds(needs.map(i => i.id == item ? item : i))
    }

    const handleCheckAll = ()=>{
        setCheckAll(!checkAll)

        setNeeds(needs.map(i=> {
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
        if(execute)
            alert("Do actions here "+ popped.id + " with settings "+ action)
        //
        setPopItem(null)//close box
    }

    return <>
    <table className="table">
        <thead className="bg-white tb-head">
            <tr>
                <th className="checkbox">
                    <input type='checkbox' checked={checkAll} onChange={e=>handleCheckAll(e.target.checked)}/>
                </th>
                <th className="title">Title</th>
                <th className="">Type of Need</th>
                <th className="">Goal</th>
                <th className="">Status</th>
                <th className="">Date Added</th>
                <th className="actions">Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                needs.length > 0 && 
                needs.map((i, ind) => <RowTable key={ind} 
                    tab={tab} 
                    item={i} 
                    checkValue={i.checked}
                    checkChange={e=>handleRowCheckbox(i,e.target.checked)}
                    onShowInfo={()=>showInfo(i)}
                    popAction={(button, type)=>togglePopItem(i, button, type)}/>
                )
            }
        </tbody>
    </table>
    {
        popped && 
        <ButtonPopper popped={popped} buttonElement={buttonElement} btnAction={action} actionClosure={executeButton}/>
    }
    </>
}
NeedTable.defaultProps = {
    type: 'approved',
    data: [] // rows
}

export default NeedTable;