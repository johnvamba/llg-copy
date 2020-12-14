import React, {useState, useEffect} from 'react';
import './css/paginator.css';

const Paginator = ({
    current_page = 1,
    last_page = 1,
    per_page = 15,
    setLimit = ()=> {},
    clickedPage = () => {},
    ...props
}) => {
    const [rowCount, setCount] = useState(7);
    const [buttonArr, setArr] = useState([]);
    useEffect(()=>{
        let arr = new Array(last_page < 5 ? last_page : 7)
        let step = arr.length
        let middle = Math.ceil(arr.length/2)
        arr = arr.fill(0).map((i, ind) => {
            if(middle >= current_page)
                return ind+1;
            else if(last_page - step >= current_page - middle)
                return current_page + (ind - middle + 1)
            else 
                return (last_page - step) + (ind + 1);
        })
        setArr(arr);
    }, [current_page, last_page]);
    return <div className="paginator bg-white">
        <div className="per-page">
            <span>Rows per page</span>
            <select onChange={(e)=>setLimit(e.target.value)} defaultValue={per_page}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
        <div className="paginate-btns">
            <button disabled={current_page == 1} onClick={e=>clickedPage(1)}><i className="fa fa-chevron-left"/><i className="fa fa-chevron-left"/></button>
            <button disabled={current_page == 1} onClick={e=>clickedPage(current_page-1)}><i className="fa fa-chevron-left"/></button>
            {
                buttonArr.map(i => <button key={'page'+i} onClick={e=>clickedPage(i)} className={`${i==current_page ? 'active' : ''}`} >{i}</button>)
            }
            <button disabled={current_page == last_page} onClick={e=>clickedPage(current_page+1)}><i className="fa fa-chevron-right"/></button>
            <button disabled={current_page == last_page} onClick={e=>clickedPage(last_page)}><i className="fa fa-chevron-right"/><i className="fa fa-chevron-right"/></button>
        </div>
    </div>
}

export default Paginator;