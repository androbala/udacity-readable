import * as api from './../utils/api'

export const SET_POSTS = 'SET_POSTS';
export const GET_POSTS = 'GET_POSTS';

export const setPosts = posts => ({
	type: SET_POSTS,
	posts: posts
})

export const getAllPosts = () => dispatch => (
	api.getPosts().then(posts => dispatch(setPosts(posts)))
)

export const getPostsByCategory = (category) => dispatch => (
	api.getPostsByCategory(category).then(posts => dispatch(setPosts(posts)))
)

export const getPostById = (id) => dispatch => (
	api.getPostById(id).then(post => dispatch(setPosts(post)))
)
