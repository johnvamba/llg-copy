import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setSearch } from '../redux/search/actions';
import { useLocation } from 'react-router-dom';

const SearchBarRedux = () => {
    const [loading, setLoading ] = useState(false);
	const [searchActive, setActive] = useState(false);
    const dispatch = useDispatch();
	const loc = useLocation();
    const search = useSelector(({SearchReducer}) => SearchReducer.search);
    // useEffect(()=>{
    // 	if(loc.pathname !== '/admin/dashboard' || loc.pathname !== '/admin') {
    // 		dispatch( setSearch(null) )
    // 	}
    // }, [loc]);

	return <div className="flex flex-1 items-center pl-12 search-header">
        <button className="text-gray-500 mr-4 focus:outline-none" onClick={()=>setActive(!searchActive)}>
            <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        <input
            name="search"
            placeholder="Search..."
            value={search || ''}
            onChange={e => dispatch( setSearch(e.target.value) )}
            onFocus={e => setActive(true) }
            className="w-64 focus:outline-none"
        />
    </div>
}
export default SearchBarRedux;