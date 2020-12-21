export const OPENFORM = "formview:Open"
export const openForm = (type = null, data = {}) => ({
    type: OPENFORM,
    payload: {
    	type, data
    }
})