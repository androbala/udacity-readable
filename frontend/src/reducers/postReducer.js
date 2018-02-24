import {
	SET_POSTS,
	GET_POSTS,
} from './../actions/postActions'

const initialState = {
	posts: [],
};

function postReducer(state = initialState, action) {
	switch(action.type) {
		case SET_POSTS :
			return {
				...state,
				posts: action.posts
			}
		default :
			return state
	}
}

export default postReducer