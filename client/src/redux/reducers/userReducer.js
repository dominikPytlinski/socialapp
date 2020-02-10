import { SET_USER, CLEAR_USER,  } from '../types';

const initialState = {
    logged: false,
    role: null,
    token: null,
    image: null,
    email: null,
    nickName: null,
    createdAt: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                logged: true,
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
                logged: false,
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