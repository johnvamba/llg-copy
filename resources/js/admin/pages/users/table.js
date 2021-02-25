import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Pencil from '../../../svg/pencil'
import Cross from '../../../svg/cross'
// import CrossPlain from '../../../svg/cross-plain'
import Quill from '../../../svg/quill'
import { usePopper } from 'react-popper';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';

const RowTable = ({item, checkValue = false, checkChange, writeStory = ()=>{}, onShowInfo, popAction}) => {
    const { title ="Untitled", email = 'N/A', age = 'N/A', bio = '', date = "Missing", photo = null} = item
    const [approveElement, setApproveElement] = useState(null);
    const [rejectElement, setRejectElement] = useState(null);

    return <tr>
        <td className="checkbox">
            <input type='checkbox' checked={checkValue} onChange={checkChange}/>
        </td>
        <td className="title" onClick={onShowInfo}>
            <div className="flex items-center">
                <img className="title-img circle" src={photo || "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp"}/>
                <p>
                    { title }
                </p>
            </div>
        </td>
        <td>
            <p>{ email }</p>
        </td>
        <td>
            <p>{ age }</p>
        </td>
        <td className="bio">
            <p>{ bio }</p>
        </td>
        <td>
            <p>{ date }</p>
        </td>
        <td className="">
            <div className="actions row-actions">
                <button onClick={onShowInfo}>
                    <i ref={setApproveElement}>
                    <UsersActionsEdit />
                    </i>
                </button>
                <button onClick={()=>popAction(rejectElement, 'remove')}>
                    <i ref={setRejectElement}>
                    <UsersActionsDelete />
                    </i>
                </button>
            </div>
        </td>
    </tr>
}
//Button Popper and action 
const ButtonPopper = ({buttonElement, actionClosure, btnAction, loading}) => {
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [togglePopper, setToggle] = useState(false);
    // const [popContent, setContent] = useState('edit')

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
                <p className="text-center mb-2 text-red-400">Are you sure you want to remove this user?</p>
                <div className="flex justify-between">
                    <Button className="text-white bg-gray-300 hover:bg-gray-500" onClick={()=>actionClosure(false)}>
                        Cancel
                    </Button>
                    <Button className="text-white bg-blue-500 hover:bg-blue-600" onClick={()=>actionClosure(true)}>
                        Yes
                    </Button>
                </div>
            </div>
        }
    </div>
}

// Proper content
//click on row shows popper
const UserTable = ({tab = null, data = [], showInfo, loading = false, loadTable})=> {
    const [checkAll, setCheckAll] = useState(false)
    const [users, setUsers] = useState([])
    const [popped, setPopItem] = useState(null)
    const [popLoading, setPopLoading] = useState(false)
    const [buttonElement, setButton] = useState(null)
    const [action, setAction] = useState('edit')

    useEffect(() => {
        setUsers(data)    
    }, [ data ])

    const handleRowCheckbox = (item, input)=>{
        setCheckAll(false)
        item.checked = input;
        setUsers(users.map(i => i.id == item ? item : i))
    }

    const handleCheckAll = ()=>{
        setCheckAll(!checkAll)

        setUsers(users.map(i=> {
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
        if(execute && popped.id){
            const text = action == 'edit' ? "You successfully edited user" : "User has been deleted"
            setPopLoading(true)
            api.delete(`/api/web/users/${popped.id}`)
                .then(()=>{
                    loadTable(true)
                    swalSuccess('User has been deleted!');
                    setPopLoading(false)
                });
        }
        //
        setPopItem(null)//close box
    }

    return <>
    <table className="table table-user">
        <thead className="bg-white tb-head">
            <tr>
                <th className="checkbox">
                    <input type='checkbox' checked={checkAll} onChange={e=>handleCheckAll(e.target.checked)}/>
                </th>
                <th className="title">Name</th>
                <th className="">Email</th>
                <th className="">Age</th>
                <th className="bio">Bio</th>
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
                    ( users.length > 0 ) ? 
                    users.map((i, ind) => <RowTable key={ind} 
                        tab={tab} 
                        item={i} 
                        checkValue={i.checked}
                        checkChange={e=>handleRowCheckbox(i,e.target.checked)}
                        onShowInfo={()=>showInfo(i, true)}
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
UserTable.defaultProps = {
    type: 'approved',
    data: [], // rows
    loadTable: ()=>{

    }
}

export default UserTable;