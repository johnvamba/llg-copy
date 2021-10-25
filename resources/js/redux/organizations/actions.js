import {
    SET_ORGANIZATIONS,
    SET_PANEL_ORG,
    SET_PANEL_SHOW,
    SET_LOADING
} from './types';

export const setOrganizations = (params) => ({
    type: SET_ORGANIZATIONS,
    payload: params
})

export const setPanel = (org = {}) => ({
    type: SET_PANEL_ORG,
    payload: org
})
export const setPanelShow = (show = null) => ({
    type: SET_PANEL_SHOW,
    payload: show
})

export const setLoading = (loading = false) => ({
    type: SET_LOADING,
    payload: loading
})