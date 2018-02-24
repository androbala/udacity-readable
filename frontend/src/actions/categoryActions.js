import * as api from './../utils/api'

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export const setCategories = categories => ({
	type: SET_CATEGORIES,
	categories: categories
})

export const getCategories = () => dispatch => (
	api.getCategories().then(categories => {
		dispatch(setCategories(categories))
	})
)