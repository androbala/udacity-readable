const BASE_URI = 'http://localhost:3001';
const headers = {
	'Authorization': 'whatever-you-want',
	'Accept': 'application/json',
	'Content-Type': 'application/json'
};

export const getCategories = () => {
	return fetch(BASE_URI + '/categories', {headers})
		.then(res => res.json());
}

export const getPosts = () => {
	return fetch(BASE_URI + '/posts', {headers})
		.then(res => res.json());
}