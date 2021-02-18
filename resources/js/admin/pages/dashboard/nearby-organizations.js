import React, { useState, useEffect, useCallback } from 'react';
import Map from '../../../components/helpers/map/';
import { Checkbox } from 'pretty-checkbox-react';
import 'pretty-checkbox';

const NearbyOrganizations = ({...props}) => {
    const [categories, setCategories] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [all, setAll] = useState(false);

    const center = {
        lat: -37.8180604,
        lng: 145.0001764
    }

    useEffect(() => {
        async function fetchData() {
            let results = [];
            let { data } = await axios.get('/api/organizations-categories');
            setCategories(data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.post(`/api/organizations/nearby/${center.lat}/${center.lng}`, {filter});
            setMarkers(data);
        }

        fetchData();
    }, [filter]);
    
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
        <div className="w-full bg-white rounded-lg border">
            <div className="flex flex-row px-4 py-4">
                <div className="flex flex-1 items-center">
                    <h2>
                        Nearby Organisations
                    </h2>
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
                    </p>

                    <Checkbox
                        className="text-sm px-2 focus:outline-none"
                        animation="smooth"
                        color="primary"
                        shape="curve"
                        icon={<i className="fas fa-check"></i>}
                        onChange={handleSetAll}
                    >
                        All
                    </Checkbox>

                    <div className="flex flex-wrap mb-2">
                        {categories.map((category, index) => (
                            <div
                                className="w-1/2 truncate"
                                key={category.name}
                            >
                                <Checkbox
                                    className="text-sm px-2 focus:outline-none"
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
                </div>

                <Map 
                    {...center}
                    markers={markers}
                    {...props}
                />
            </div>
        </div>
    )
}

export default NearbyOrganizations;