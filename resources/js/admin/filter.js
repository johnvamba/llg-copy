import React, {useState} from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { usePopper } from 'react-popper';

import NeedFilter from './pages/needs/filter';
import OrganizationFilter from './pages/organizations/filter';

const filters = [
    {
        path: '/needs',
        component: (props)=><NeedFilter {...props}/>
    },
    {
        path: '/organizations',
        component: (props)=><OrganizationFilter {...props}/>
    },
    {
        path: '*',
        component: () => (
            <div classname="px-3 py-2">No filter for this page</div>
        )
    }

]

const MainFilter = ({referElement, onClose}) => {
    const loc = useLocation();
    // console.log("location",loc);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const {styles, attributes} = usePopper(referElement, popperElement, {
        placement: 'bottom-start',
        className: 'arror',
        modifiers: [{name: 'arrow', options: {element: arrowElement } }],
    })
    return (
        <div ref={setPopperElement} className="filter-content" style={{...styles.popper, top:'20px', left: '-25px', zIndex: 1}} {...attributes.popper}>
            <div ref={setArrowElement} className='filter-arrow' style={{...styles.arrow}} />
            <Switch>
                {filters.map((route, index) =>
                    (
                        <Route
                            key={index}
                            path={route.path}
                            onClose={onClose}
                            children={<route.component style={styles.popper} onClose={onClose} {...attributes.popper}/>}
                        />
                    )
                 )
                }
            </Switch>
        </div>
    )
}
export default MainFilter;