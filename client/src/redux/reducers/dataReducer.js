import { SET_POSTS, LOADING_DATA } from '../types';

const initialState = {
    posts: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}