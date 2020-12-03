import React, { useState, useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';
import LoadingScreen from './LoadingScreen';

// const Items = ({title = 'Miscellaneous', items = [], linkTo = '', callBack}) => <li className="result-group">
// 	<div className="item">
// 		<h3>Needs</h3>
// 		<ul className="item-results">
// 			<li>
// 				<i className="fa fa-angle-right"></i>
// 				<h5>Title or name</h5>
// 			</li>
// 			<li>
// 				<i className="fa fa-angle-right"></i>
// 				<h5>Title or name</h5>
// 			</li>
// 			<li>
// 				<i className="fa fa-angle-right"></i>
// 				<h5>Title or name</h5>
// 			</li>
// 		</ul>
// 	</div>
// </li>

const SearchBar = () => {
	const [ search, setSearch ] = useState('');
    const [loading, setLoading ] = useState(false);
	const [searchActive, setActive] = useState(false);
    const [referElement, setRefElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [results, setResults] = useState({
    	needs: [],
		stories: [],
		offers: [],
		organisations: [],
		groups: []
    });
    const wrapperRef = useRef(null);
    const {styles, attributes} = usePopper(referElement, popperElement, {
        placement: 'bottom-start',
        className: 'arror',
        modifiers: [{name: 'arrow', options: {element: arrowElement } }],
    })
    useEffect(()=>{
		const handleAntiClick = (e)=>{
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
	            setActive(false)
	        }
		}
    	document.addEventListener("mousedown", handleAntiClick);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleAntiClick);
        };
    }, [wrapperRef]);

    useEffect(()=>{
    	let cancel = false;
    	const searchSet = () => {
    		setLoading(true)
    		if(search != '')
	    		api.get('/api/web/search', {
	    			params: { search }
	    		}).then(({data})=>{
	    			if(cancel)
	    				return;

	    			setLoading(false)
	    			setResults({...data.data})
	    			console.log('response', data);
	    		})
    	}
    	searchSet();
    	return () => {
    		cancel = true;
    	}
    }, [search])

	return <div className="flex flex-1 items-center pl-12 search-header">
        <button className="text-gray-500 mr-4 focus:outline-none" onClick={()=>setActive(!searchActive)}>
            <i className="fa fa-search" aria-hidden="true" ref={setRefElement}></i>
        </button>
        <input
            name="search"
            placeholder="Search..."
            value={search}
            onChange={e=> setSearch(e.target.value)}
            onFocus={e=>setActive(true)}
            className="w-64 focus:outline-none"
        />
        {
        	(search != '' && searchActive) && 
	        <div ref={setPopperElement} className="search-content" style={{...styles.popper, top:'20px', left: '-25px', zIndex: 1}} {...attributes.popper}>
	            <div ref={setArrowElement} className='search-arrow' style={{...styles.arrow}} />
	            <div ref={wrapperRef} className="search-listing">
	            	{
	            		loading ? <LoadingScreen title={loading && `Looking for ${search}...`} /> :
	            		<ul className="results-item">
	            			{
	            				(results.needs && results.needs.length > 0) &&
		            			<li className="result-group">
		            				<div className="item">
		            					<h3>Needs</h3>
		            					<ul className="item-results">
		            						{
		            							results.needs.map((i, k) => <li key={"need"+k}>
			            							<i className="fa fa-angle-right"></i>
			            							<h5>{i.title || i.name || 'missing-name'}</h5>
			            						</li>)
		            						}
		            					</ul>
		            				</div>
		            			</li>
	            			}
	            			{
	            				(results.stories && results.stories.length > 0) &&
		            			<li className="result-group">
		            				<div className="item">
		            					<h3>Stories</h3>
		            					<ul className="item-results">
		            						{
		            							results.stories.map((i, k) => <li key={"stories"+k}>
			            							<i className="fa fa-angle-right"></i>
			            							<h5>{i.title || i.name || 'missing-name'}</h5>
			            						</li>)
		            						}
		            					</ul>
		            				</div>
		            			</li>
	            			}
	            			{
	            				(results.offers && results.offers.length > 0) &&
		            			<li className="result-group">
		            				<div className="item">
		            					<h3>Offers</h3>
		            					<ul className="item-results">
		            						{
		            							results.offers.map((i, k) => <li key={"offers"+k}>
			            							<i className="fa fa-angle-right"></i>
			            							<h5>{i.title || i.name || 'missing-name'}</h5>
			            						</li>)
		            						}
		            					</ul>
		            				</div>
		            			</li>
	            			}
	            			{
	            				(results.organisations && results.organisations.length > 0) &&
		            			<li className="result-group">
		            				<div className="item">
		            					<h3>Organisations</h3>
		            					<ul className="item-results">
		            						{
		            							results.organisations.map((i, k) => <li key={"organisations"+k}>
			            							<i className="fa fa-angle-right"></i>
			            							<h5>{i.title || i.name || 'missing-name'}</h5>
			            						</li>)
		            						}
		            					</ul>
		            				</div>
		            			</li>
	            			}
	            			{
	            				(results.groups && results.groups.length > 0) &&
		            			<li className="result-group">
		            				<div className="item">
		            					<h3>Groups</h3>
		            					<ul className="item-results">
		            						{
		            							results.groups.map((i, k) => <li key={"groups"+k}>
			            							<i className="fa fa-angle-right"></i>
			            							<h5>{i.title || i.name || 'missing-name'}</h5>
			            						</li>)
		            						}
		            					</ul>
		            				</div>
		            			</li>
	            			}
	            		</ul>
	            	}
	            </div>
	        </div>
        }
    </div>
}
export default SearchBar;