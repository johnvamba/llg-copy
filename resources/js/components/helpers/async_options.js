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
    borderBottom: state.isFocused ? '1px solid #D7DEE3' : '1px solid #D7DEE3',
    borderRadius: 0,
    fontSize: '14px',
    lineHeight: '24px',
    padding: '0',
    cursor: 'pointer',
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      borderBottom: '1px solid #CF995F',
    }
  }),
  input: () => ({
    padding: '10px 0',
  }),
  valueContainer: (provided)=>({
  	...provided,
  	padding: '0',
  }),
  option: (provided,state)=>({
  	...provided,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#231F20',
    cursor: 'pointer',
    fontSize: '14px',
    backgroundColor: state.isSelected ? 'rgba(207, 153, 95, 0.1)' : '#fff',
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    '&:hover': {
      backgroundColor: 'rgba(207, 153, 95, 0.1)',
    }
}

export const loadOrganization = (name = '', callback, options = {}, catchFunc = (err)=>{}) => {
	api.get('/api/web/organizations/async', {
		params: {
			name,
			...options
		},
		cache: {
      clearCache: true,
      exclude: { query: false },
    }, 
	}).then(({data})=>{
		callback(data.data)
	}).catch(catchFunc)
}

export const loadGroups = (name = '', callback, options = {}, catchFunc = (err)=>{}) => {
  api.get('/api/web/groups/async', {
    params: {
      name,
      ...options
    },
    cache: {
      clearCache: true,
      exclude: { query: false },
    }, 
  }).then(({data})=>{
    callback(data.data)
  }).catch(catchFunc)
}

export const loadNeeds = (title = '', callback, options = {}, catchFunc = (err)=>{}) => {
  api.get('/api/web/needs/async', {
    params: {
      title,
      ...options
    },
    cache: {
      clearCache: true,
      exclude: { query: false },
    }, 
  }).then(({data})=>{
    callback(data.data)
  }).catch(catchFunc)
}


export const loadCampus = (name = '', callback, options = {}, catchFunc = (err)=>{}) => {
  api.get('/api/web/campuses/async', {
    params: {
      name,
      ...options
    },
    cache: {
        clearCache: true,
        exclude: { query: false },
      }, 
  }).then(({data})=>{
    callback(data.data)
  }).catch(catchFunc)
}

export const checkEmail = (email = '', options = {}) => {
  return new api.get('/api/checkemail', {
    params: {
      email,
      ...options
    },
    cache: {
      clearCache: true,
      exclude: { query: false },
    }, 
  })
}