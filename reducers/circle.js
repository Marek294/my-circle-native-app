import {
    CLEAR_STORAGE,
    SET_POSTS,
    SET_USERS_NOT_IN_CIRCLE,
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    SET_ERROR,
    SET_USER_IS_ADMIN,
    SET_COMMENTS,
    STOP_FETCHING_DATA,
    SET_USERS_IN_CIRCLE,
    CLEAR_CIRCLE,
    PUSH_POST } from '../actions/types';

const initialState = {
    id: 0,
    name: '',
    posts: [],
    usersNotInCircle: [],
    usersInCircle: [],
    isFetching: false,
    errors: {},
    isAdmin: false,
    post: {},
    commentaries: []
};

export default ( state = initialState, action = {}) => {
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                id: action.id,
                name: action.name,
                posts: action.posts,
                isFetching: action.isFetching,
            };
        case PUSH_POST: {
            var posts = state.posts;
            posts.push(action.data);
            return {
                ...state,
                posts: posts
            };
        }
        case SET_USERS_NOT_IN_CIRCLE:
            return {
                ...state,
                usersNotInCircle: action.users,
                isFetching: action.isFetching,
                errors: action.errors
            };
        case SET_USERS_IN_CIRCLE:
            return {
                ...state,
                usersInCircle: action.users,
                isFetching: action.isFetching,
                errors: action.errors
            };
        case FETCHING_DATA:
            return {
                ...state,
                isFetching: true
            };
        case STOP_FETCHING_DATA:
            return {
                ...state,
                isFetching: false
            };
        case SET_ERROR:
            return {
                ...state,
                errors: action.errors
            };
        case SET_USER_IS_ADMIN:
            return {
                ...state,
                isAdmin: action.isAdmin
            }
        case SET_COMMENTS:
            return {
                ...state,
                post: action.post,
                commentaries: action.commentaries,
                isFetching: action.isFetching
            }
        case CLEAR_CIRCLE:
            return {
                id: 0,
                name: '',
                posts: [],
                usersNotInCircle: [],
                usersInCircle: [],
                isFetching: false,
                errors: {},
                isAdmin: false,
                post: {},
                commentaries: []
            }
        case CLEAR_STORAGE:
            return initialState;
        default: return state;
    }
}
