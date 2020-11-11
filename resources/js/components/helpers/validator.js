export const validateEmail = (email = '') => {
	if (email == '' || typeof email == 'undefined')
		return false;
	const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const isValidated = (obj = {}) =>{
	Object.keys(obj).forEach(i=>obj[i] == null && delete obj[i])
	return obj;
}