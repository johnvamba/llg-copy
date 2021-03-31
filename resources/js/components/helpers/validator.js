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

export const tryParseJson = (jsonString = '') => {
	try {
		var parse = JSON.parse(jsonString);
		if(parse && typeof parse === 'object')
			return true;
	} catch (e) {
		return false;
	}
	return false
}

export const validBenevityLink = (link = '')=> {
	if(validURL(link))
		return link.match('causes.benevity.org');
	
	return false;
}

export const validURL = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}