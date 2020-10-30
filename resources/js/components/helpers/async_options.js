export const selectStyle = {
  control: (provided,state) => ({
    ...provided,
    border: 0,
    borderBottom: '1px solid #D7DEE3',
    borderRadius: 0,
    fontSize: '14px',
    lineHeight: '24px',
    padding: '10px 0',
  }),
}

export const loadOrganization = (name = '', callback, options = {}, catchFunc = ()=>{}) => {
	api.get('/api/web/organizations/async', {
		params: {
			name,
			...options
		},
		cache: {
	        exclude: { query: false },
	    }, 
	}).then(({data})=>{
		callback(data.data)
	}).catch(err=>{
		catchFunc
	})
}