export const validateEmail = (email = '') => {
	if (email == '' || typeof email == 'undefined')
		return false;
	const re = /\S+@\S+\.\S+/;
    return re.test(email);
}