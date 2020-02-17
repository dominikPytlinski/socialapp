import { SET_USER, CLEAR_USER, LOADING_USER, STOP_LOADING_USER, SET_USER_ERRORS, CLEAR_USER_ERRORS,  } from '../types';

const initialState = {
    loading: false,
    loadingLogged: true,
    logged: false,
    id: null,
    role: null,
    token: null,
    image: null,
    email: null,
    nickName: null,
    createdAt: null,
    errors: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING_USER:
            return {
                ...state,
                loadingLogged: false
            }
        case SET_USER:
            return {
                ...state,
                loading: false,
                loadingLogged: false,
                logged: true,
                id: action.payload.user._id,
                role: action.payload.user.role.role,
                token: action.payload.token,
                image: action.payload.user.image,
                email: action.payload.user.email,
                nickName: action.payload.user.nickName,
                createdAt: action.payload.user.createdAt,
                errors: null
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
                createdAt: null,
                errors: null
            }
        case SET_USER_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false
            }
        case CLEAR_USER_ERRORS:
            return {
                ...state,
                errors: null,
                loading: false
            }
        default:
            return state;
    }
}