import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import { useSelector, useDispatch } from 'react-redux';
import { setPanel, setPanelShow, setLoading } from '../redux/organizations/actions';
import Form from './pages/organizations/form';
import OrgView from './pages/organizations/info';
import OrgInvite from './pages/organizations/invite';

const Content = ({ ...props }) => {
    const { org, show, loading } = useSelector( state => state.OrganizationsReducer );
    const { roles } = useSelector( state => state.AuthUserReducer );
    const dispatch = useDispatch();
    useEffect(()=> {
        if(roles.name == 'organization admin' && _.isEmpty(org)) {
            loadOrg()
        }
    }, [ roles ] );

    const loadOrg = () => {
        const addFilter = {}; //for redux values
        const token = axios.CancelToken.source();
        dispatch(setLoading(true));
        api.get(`/api/web/organizations`, {
            params: { page: 1 },
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: true,
            cancelToken: token.token
        }).then(({ data })=>{
            dispatch(setPanel( data.data.length > 0 ? data.data[0] : {} ));
        }).finally(()=>{
            dispatch(setLoading(false));
        })

        return token; //for useEffect
    }

    const handlePanels = (open = null) => {
        dispatch(setPanelShow(open))
    }

    const updatedOrg = (e, data = {}) => {
        if(!_.isEmpty(data)){
            dispatch(setPanel(data))
        }
        handlePanels('info')
    }

    return (
        <div className="relative flex-1 overflow-auto bg-gray-100">
            <Switch>
                {routes.map((route, index) =>
                    (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            children={<route.component {...props} />}
                        />
                    )
                 )
                }
            </Switch>
            <React.Fragment>
            {
                (show == 'form') && <Form data={org} afterSubmit={()=>{}} handleClose={updatedOrg}/>
            }
            { 
                show == "info" && <OrgView
                    data={org}
                    closePanel={handlePanels}
                    handleEdit={() => handlePanels('form')}
                    handleInvite={() => handlePanels('invite')}
                />
            }
            {
                show == 'invite' && 
                <OrgInvite data={org} handleBackInvite={() => handlePanels('info')} />
            }
            </React.Fragment>
        </div>
    )
}

export default Content;