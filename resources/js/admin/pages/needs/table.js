import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Check from '../../../svg/check'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
import { usePopper } from 'react-popper';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';

const RowTable = ({item, checkValue = false, checkChange, writeStory = ()=>{}, onShowInfo, popAction, handleForm}) => {
    const { title ="Untitled", type = "Donation", goal = "N/A", status = "achieved", date = "Missing", date_added, photo=null} = item
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
        <td className="title" onClick={onShowInfo}>
            <div className="flex items-center"> 
                {
                    photo ?
                    <img className="title-img" src={photo}/> :
                    <img className="title-img" />
                }
                <span>
                    { title }
                </span>
            </div>
        </td>
        <td>
            <p>{ type }</p>
        </td>
        <td className="col-currency">
            {
                (type != 'Volunteer') ? ( <p><span className="currency">$</span>{parseFloat(goal).toFixed(2)}</p>) : <p>N/A</p>
            }
        </td>
        <td>
            { switchStatus() }
        </td>
        <td>
            <p>{ date_added || date }</p>
        </td>
        {
            status == 'pending' ?
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
            </td> :
            <td>
                <div className="actions row-actions">
                    <Button className="primary-btn flex text-white bg-blue-500 hover:bg-blue-600" 
                        disabled={status !== 'achieved'}
                        onClick={()=>handleForm(item.organization, false, 'story', true)}>
                        <Quill/>
                        Write a Story
                    </Button>
                </div>
            </td>
        }
    </tr>
}
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

// Proper content
//click on row shows popper
const NeedTable = ({tab = null, data = [], showInfo, loading = false, loadTable, handleForm=()=>{}})=> {
    const [checkAll, setCheckAll] = useState(false)
    const [needs, setNeeds] = useState([])
    const [popped, setPopItem] = useState(null)
    const [popLoading, setPopLoading] = useState(false)
    const [buttonElement, setButton] = useState(null)
    const [action, setAction] = useState('approve')

    useEffect(() => {
        setNeeds(data)    
    }, [ data ])

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
        if(execute){
            const text = action == 'approve' ? "You successfully approved a need" : "Need has been rejected, archieving"
            // return;
            setPopLoading(true)
            api.post(`/api/web/needs/${popped.id}/${action}`)
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
            { loading ?
                <tr>
                    <td colSpan={7}>Loading data</td>
                </tr> :
                (
                    ( needs.length > 0 ) ? 
                    needs.map((i, ind) => <RowTable key={ind} 
                        tab={tab} 
                        item={i} 
                        checkValue={i.checked}
                        checkChange={e=>handleRowCheckbox(i,e.target.checked)}
                        handleForm={handleForm}
                        onShowInfo={()=>showInfo(i)}
                        popAction={(button, type)=>togglePopItem(i, button, type)}/>
                    ) :
                    <tr>
                        <td colSpan={7}>No data found</td>
                    </tr>
                )
            }
        </tbody>
    </table>
    {
        popped && 
        <ButtonPopper popped={popped} loading={popLoading} buttonElement={buttonElement} btnAction={action} actionClosure={executeButton}/>
    }
    </>
}
NeedTable.defaultProps = {
    type: 'approved',
    data: [], // rows
    loadTable: ()=>{

    }
}

export default NeedTable;