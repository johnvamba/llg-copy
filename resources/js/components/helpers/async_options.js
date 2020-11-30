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
export const selectStylePaddingZero = {
  control: (provided,state) => ({
    ...provided,
    border: 0,
    borderBottom: '1px solid #D7DEE3',
    borderRadius: 0,
    fontSize: '14px',
    lineHeight: '24px',
    padding: '0',
  }),
  input: () => ({
    padding: '10px 0',
  }),
  valueContainer: (provided)=>({
  	...provided,
  	padding: '0',
  }),
  option: (provided)=>({
  	...provided,
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
  }),
  indicatorSeparator: () => ({
  	display: 'none'
  })
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

export const loadCampus = (name = '', callback, options = {}, catchFunc = ()=>{}) => {
  api.get('/api/web/campuses/async', {
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