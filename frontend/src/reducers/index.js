import {combineReducers} from 'redux'

import {
	SET_CATEGORIES,
	GET_CATEGORIES,
} from './../actions/categoryActions'

const initialState = {
	categories: [],
};

function mainReducer(state = initialState, action) {
	switch(action.type) {
		case SET_CATEGORIES :
			return {
				...state,
				categories: action.categories.categories
			}
		default :
			return state
	}
}

export default mainReducer