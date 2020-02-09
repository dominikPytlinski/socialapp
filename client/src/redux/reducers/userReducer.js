import { SET_USER, LOADING_USER } from '../types';

const initialState = {
    loading: false,
    logged: sessionStorage.getItem('auth') ? true : false,
    role: null,
    token: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loading: false,
                logged: true,
                role: action.payload.data.role.role
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}