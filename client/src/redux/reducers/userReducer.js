import { SET_USER, CLEAR_USER, LOADING_USER,  } from '../types';

const initialState = {
    loading: false,
    logged: false,
    id: null,
    role: null,
    token: null,
    image: null,
    email: null,
    nickName: null,
    createdAt: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case SET_USER:
            return {
                ...state,
                loading: false,
                logged: true,
                id: action.payload.user._id,
                role: action.payload.user.role.role,
                token: action.payload.token,
                image: action.payload.user.image,
                email: action.payload.user.email,
                nickName: action.payload.user.nickName,
                createdAt: action.payload.user.createdAt
            }
        case CLEAR_USER:
            return {
                ...state,
                loading: false,
                logged: false,
                id: null,
                role: null,
                token: null,
                image: null,
                email: null,
                nickName: null,
                createdAt: null
            }
        default:
            return state;
    }
}