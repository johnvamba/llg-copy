import React, { useState, useEffect, useCallback } from 'react';
import Map from '../../../components/helpers/map/';
import { Checkbox } from 'pretty-checkbox-react';
import { connect, useSelector } from 'react-redux';
import { usePopper } from 'react-popper';
import OrgsMarker from '../../../../assets/images/orgs.png';
import OffersMarker from '../../../../assets/images/offers.png';
import GroupMarker from '../../../../assets/images/groups.png';
import LocMarker from '../../../../assets/images/churches.png';

import 'pretty-checkbox';
import './dashboard.css';

const NearbyOrganizations = ({...props}) => {
    const [categories, setCategories] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [openSelect, setOpenSelect] = useState(false);
    const [catLoading, setCatLoading] = useState(false);
    const [filter, setFilter] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [all, setAll] = useState(false);
    //HQ
    const [center, setCenter] = useState({
        lat: -37.8136,
        lng: 144.9631
    });
    
    const loc = useSelector(({AuthUserReducer}) => AuthUserReducer.loc);
    //popper config
    const [filterElement, setFilterElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [legend, showLegend] = useState(false);
    const {styles, attributes} = usePopper(filterElement, popperElement, {
        placement: 'bottom-start',
        className: 'arror',
        modifiers: [{name: 'arrow', options: {element: arrowElement } }],
    })

    useEffect(()=> {
        if(!_.isEmpty(loc)){
            setCenter(loc)
        }
    }, [loc])

    useEffect(() => {
        async function fetchData() {
            let results = [];
            let { data } = await axios.get('/api/organizations-categories');
            setCategories(data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if(!openSelect && filter.length > 0) 
            setOpenSelect(true)
    }, [filter]);

    const selectCategories = async () => {
        setCatLoading(true)
        let { data } = await axios.post(`/api/organizations/nearby/${center.lat}/${center.lng}`, {filter});
        setMarkers(data);
        setOpenSelect(false);
        setCatLoading(false);
        setShowFilter(false);
    }
    
    const handleCheck = (e) => {
        let checks = [...filter];
        let index = filter.map(value => {return value}).indexOf(parseInt(e.target.value));

        if (index > -1) {
            delete checks[index];
            let temp = checks.filter(value => value);
            checks = temp;
        }else {
            checks = [...filter, parseInt(e.target.value)];
        }

        setFilter(checks);
    };

    const handleSetAll = () => {
        if (all) {
            setFilter([]);            
        }else {
            let checks = [];
            checks = categories.map(category => {return category.id});
            setFilter(checks);
        }

        setAll(!all);
    }

    return (
        <div className="w-full bg-white rounded-lg border" style={{height: "fit-content"}}>
            <div className="flex flex-row px-4 py-4">
                <div className="flex flex-1 items-center">
                    <h2>
                        Nearby Organisations
                    </h2>
                    <svg className="ml-2" ref={setFilterElement} onClick={()=>showLegend(!legend)} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7 1.3125C5.49158 1.3125 4.04494 1.91172 2.97833 2.97833C1.91172 4.04494 1.3125 5.49158 1.3125 7C1.3125 8.50842 1.91172 9.95506 2.97833 11.0217C4.04494 12.0883 5.49158 12.6875 7 12.6875C8.50842 12.6875 9.95506 12.0883 11.0217 11.0217C12.0883 9.95506 12.6875 8.50842 12.6875 7C12.6875 5.49158 12.0883 4.04494 11.0217 2.97833C9.95506 1.91172 8.50842 1.3125 7 1.3125ZM0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14C5.14348 14 3.36301 13.2625 2.05025 11.9497C0.737498 10.637 0 8.85652 0 7ZM5.6875 6.78125C5.6875 6.6072 5.75664 6.44028 5.87971 6.31721C6.00278 6.19414 6.1697 6.125 6.34375 6.125H7.21875C7.3928 6.125 7.55972 6.19414 7.68279 6.31721C7.80586 6.44028 7.875 6.6072 7.875 6.78125V9.1875H8.09375C8.2678 9.1875 8.43472 9.25664 8.55779 9.37971C8.68086 9.50278 8.75 9.6697 8.75 9.84375C8.75 10.0178 8.68086 10.1847 8.55779 10.3078C8.43472 10.4309 8.2678 10.5 8.09375 10.5H6.34375C6.1697 10.5 6.00278 10.4309 5.87971 10.3078C5.75664 10.1847 5.6875 10.0178 5.6875 9.84375C5.6875 9.6697 5.75664 9.50278 5.87971 9.37971C6.00278 9.25664 6.1697 9.1875 6.34375 9.1875H6.5625V7.4375H6.34375C6.1697 7.4375 6.00278 7.36836 5.87971 7.24529C5.75664 7.12222 5.6875 6.9553 5.6875 6.78125ZM7 5.25C7.23206 5.25 7.45462 5.15781 7.61872 4.99372C7.78281 4.82962 7.875 4.60706 7.875 4.375C7.875 4.14294 7.78281 3.92038 7.61872 3.75628C7.45462 3.59219 7.23206 3.5 7 3.5C6.76794 3.5 6.54538 3.59219 6.38128 3.75628C6.21719 3.92038 6.125 4.14294 6.125 4.375C6.125 4.60706 6.21719 4.82962 6.38128 4.99372C6.54538 5.15781 6.76794 5.25 7 5.25Z" fill="#CF995F"/>
                    </svg>
                    {
                        legend && <div ref={setPopperElement} 
                            className="filter-content" 
                            style={{...styles.popper, top:'15px', zIndex: 1}} 
                            {...attributes.popper}>
                            <div ref={setArrowElement} className='dbfilter-arrow' style={{...styles.arrow}} />
                            <div className="map-legend w-200">
                                <h4>Legend</h4>
                                <div className="legend-item">
                                    <img src={OffersMarker} />
                                    <div className="ml-1">
                                        <h5>Offers</h5>
                                        <p>See available offers on the map</p>
                                    </div>
                                </div>
                                <div className="legend-item">
                                    <img src={OrgsMarker} />
                                    <div className="ml-1">
                                        <h5>Organisations</h5>
                                        <p>Approved organisation on nuema care.</p>
                                    </div>
                                </div>
                                <div className="legend-item">
                                    <img src={GroupMarker} />

                                    <div className="ml-1">
                                        <h5>Lifegroup</h5>
                                        <p>Visible groups on neuma care.</p>
                                    </div>
                                </div>
                                <div className="legend-item">
                                    <img src={LocMarker} />
                                    <div className="ml-1">
                                        <h5>Location</h5>
                                        <p>Main locations</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="flex flex-1 justify-end items-center">
                    <a onClick={() => setShowFilter(!showFilter)}>
                        <i className={`${showFilter ? "text-blue-400" : "text-black"} fas fa-sliders-h `}></i>
                    </a>
                </div>
            </div>

            <div className="relative">
                <div
                    className={`p-4 rounded-lg w-3/4 bg-white border  ${showFilter ? "absolute top-0 right-0 z-40 " : "hidden"}`}
                >
                    <p className="text-xs py-2 text-gray-500 font-thin">
                        Show
                        <span className="float-right fa fa-times" onClick={()=> setShowFilter(false)}></span>
                    </p>

                    <div className="flex flex-wrap">
                        <div className="truncate mb-1">
                            <Checkbox
                                animation="smooth"
                                color="primary"
                                shape="curve"
                                icon={<i className="fas fa-check"></i>}
                                onChange={handleSetAll}
                            >
                                <p className="break-words">All</p>
                            </Checkbox>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-2">
                        {categories.map((category, index) => (
                            <div
                                className="w-1/2 truncate mb-1"
                                key={category.name}
                            >
                                <Checkbox
                                    animation="smooth"
                                    color="primary"
                                    shape="curve"
                                    value={category.id}
                                    icon={<i className="fas fa-check"></i>}
                                    onChange={handleCheck}
                                    checked={all || filter.includes(category.id)}
                                >
                                    <p className="break-words">
                                        {category.name}
                                    </p>
                                </Checkbox>
                            </div>
                        ))
                        }
                    </div>
                    <div className="flex flex-wrap">
                        <button type="button" 
                            className="p-2 rounded focus:outline-none px-4 primary-btn flex text-white bg-blue-500 hover:bg-blue-600"
                            onClick={selectCategories} 
                            disabled={!openSelect || catLoading}>
                            {catLoading ? 'Loading' :'Select'}
                        </button>
                    </div>
                </div>

                <Map 
                    {...center}
                    setCenter={setCenter}
                    markers={markers}
                    {...props}
                />
            </div>
        </div>
    )
}

export default NearbyOrganizations;