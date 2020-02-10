import { SET_USER, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, STOP_LOADING, CLEAR_USER } from '../types';
import axios from 'axios';

export const loginUser = (loginData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios.post('http://localhost:4000/login', loginData)
        .then(res => {
            dispatch({
                type: STOP_LOADING
            });
            dispatch({
                type: SET_USER,
                payload: res.data.data
            });
            const auth = {
                token: res.data.data.token,
                role: res.data.data.user.role.role,
                id: res.data.data.user._id
            }
            setAuthorizationHeader(res.data.data.token);
            sessionStorage.setItem('auth', JSON.stringify(auth));
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        });
}

export const getUserData = (auth) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios.get(`http://localhost:4000/users/${auth.id}`)
        .then(res => {
            const data = {
                user: res.data.data
            }
            dispatch({
                type: STOP_LOADING
            });
            dispatch({
                type: SET_USER,
                payload: data
            })
        })
        .catch(err => console.log(err));
}

export const clearUserErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}

export const logoutUser = (e) => (dispatch) => {
    sessionStorage.removeItem('auth');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: CLEAR_USER
    });
    
}

const setAuthorizationHeader = (token) => {
    const authToken = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = authToken;
}