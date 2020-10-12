import React, {useState} from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { usePopper } from 'react-popper';

import NeedFilter from './pages/needs/filter';
import OrganizationFilter from './pages/organizations/filter';

const filters = [
    {
        path: '/needs',
        component: ()=><NeedFilter/>
    },
    {
        path: '/organizations',
        component: ()=><OrganizationFilter/>
    },
    {
        path: '*',
        component: () => (
            <div>Content not found</div>
        )
    }

]

const MainFilter = ({referElement}) => {
    const loc = useLocation();
    console.log("location",loc);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const {styles, attributes} = usePopper(referElement, popperElement, {
        placement: 'bottom-end',
        modifiers: [{name: 'arrow', options: {element: arrowElement } }],
    })
    console.log('Sets', popperElement,arrowElement, referElement, styles, attributes)
    return (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            <div ref={setArrowElement} style={styles.arrow} />
            <Switch>
                {filters.map((route, index) =>
                    (
                        <Route
                            key={index}
                            path={route.path}
                            children={<route.component style={styles.popper} {...attributes.popper}/>}
                        />
                    )
                 )
                }
            </Switch>
        </div>
    )
}
export default MainFilter;