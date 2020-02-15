import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types';

const initialState = {
    posts: [],
    post: {},
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
        case LIKE_POST:
            const index = state.posts.findIndex(post => post._id === action.payload.postId);
            state.posts[index].likes.push(action.payload.userId)
            return {
                ...state
            }
        case UNLIKE_POST:
            const postIndex = state.posts.findIndex(post => post._id === action.payload.postId);
            const likeIndex = state.posts[postIndex].likes.findIndex(like => like === action.payload.userId);
            state.posts[postIndex].likes.splice(likeIndex, 1);
            return {
                ...state
            }
        default:
            return state;
    }
}