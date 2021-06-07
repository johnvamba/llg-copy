import React, { useState, useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';
import LoadingScreen from './LoadingScreen';

const SearchBar = () => {
	const [ search, setSearch ] = useState('');
    const [loading, setLoading ] = useState(false);
	const [searchActive, setActive] = useState(false);
    const [referElement, setRefElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [results, setResults] = useState({
  //   	needs: [],
		// stories: [],
		// offers: [],
		// organisations: [],
		// groups: []
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
	    			// console.log('response', data);
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
	            <div ref={wrapperRef} className={`search-listing ${loading ? 'searching' : ''}`}>
	            	{
	            		loading ? <LoadingScreen title={loading && `Looking for ${search}...`} /> :
	            		<div className="results-item">
	            		{
	            			/*
	            			<div className="result-header">
	            				<i className="fa fa-search"></i>
		            			<h5>Maybe look for other keywords</h5>
	            			</div>
	            			*/
	            		}
	            			<div className="result-groups">
	            			{
	            				(_.isEmpty(results)) &&
	            				<div className="result-header">
		            				<i className="fa fa-search"></i>
			            			<h5>Maybe look for other keywords</h5>
		            			</div>
	            			}
	            			{
	            				(results.needs && results.needs.length > 0) &&
		            			<div className="result-group">
		            				<h4>Needs</h4>
		            				<div className="item-results">
		            					{
	            							results.needs.map((i, k) =><div className="item" key={'need'+i.id}>
			            						<span className="item-image" style={{backgroundImage: `url(${i.photo})`}}/>
			            						<h5>{i.title || i.name || 'missing-name'}</h5>
			            						{ i.subtitle && <span className="subtitle">{i.subtitle}</span>}
			            					</div>)
		            					// <div className="more-item">
		            					// 	<h6 className="show-more">Show More Needs</h6>
		            					// </div>
	            						}
		            				</div>
		            			</div>
	            			}
	            			{
	            				(results.stories && results.stories.length > 0) &&
		            			<div className="result-group">
		            				<h4>Stories</h4>
		            				<div className="item-results">
		            					{
	            							results.stories.map((i, k) =><div className="item" key={'story'+i.id}>
			            						<span className="item-image" style={{backgroundImage: `url(${i.photo})`}}/>
			            						<h5>{i.title || i.name || 'missing-name'}</h5>
			            						{ i.subtitle && <span className="subtitle">{i.subtitle}</span>}
			            					</div>)
		            					// <div className="more-item">
		            					// 	<h6 className="show-more">Show More Stories</h6>
		            					// </div>
	            						}
		            				</div>
		            			</div>
	            			}
							{
								(results.offers && results.offers.length > 0) &&
								<div className="result-group">
									<h4>Offers</h4>
									<div className="item-results">
										{
											results.offers.map((i, k) =><div className="item" key={'need'+i.id}>
												<span className="item-image" style={{backgroundImage: `url(${i.photo})`}}/>
												<h5>{i.title || i.name || 'missing-name'}</h5>
			            						{ i.subtitle && <span className="subtitle">{i.subtitle}</span>}
											</div>)
										// <div className="more-item">
										// 	<h6 className="show-more">Show More Offers</h6>
										// </div>
										}
									</div>
								</div>
							}
							{
	            				(results.organisations && results.organisations.length > 0) &&
		            			<div className="result-group">
		            				<h4>Organisations</h4>
		            				<div className="item-results">
		            					{
	            							results.organisations.map((i, k) =><div className="item" key={'need'+i.id}>
			            						<span className="item-image" style={{backgroundImage: `url(${i.photo})`}}/>
			            						<h5>{i.title || i.name || 'missing-name'}</h5>
			            						{ i.subtitle && <span className="subtitle">{i.subtitle}</span>}
			            					</div>)
		            					// <div className="more-item">
		            					// 	<h6 className="show-more">Show More Organisations</h6>
		            					// </div>
	            						}
		            				</div>
		            			</div>
	            			}
	            			{
	            				(results.groups && results.groups.length > 0) &&
		            			<div className="result-group">
		            				<h4>Groups</h4>
		            				<div className="item-results">
		            					{
	            							results.groups.map((i, k) =><div className="item" key={'need'+i.id}>
			            						<span className="item-image" style={{backgroundImage: `url(${i.photo})`}}/>
			            						<h5>{i.title || i.name || 'missing-name'}</h5>
			            						{ i.subtitle && <span className="subtitle">{i.subtitle}</span>}
			            					</div>)
		            					// <div className="more-item">
		            					// 	<h6 className="show-more">Show More Groups</h6>
		            					// </div>
	            						}
		            				</div>
		            			</div>
	            			}
	            			</div>
	            		</div>
	            	}
	            </div>
	        </div>
        }
    </div>
}
export default SearchBar;