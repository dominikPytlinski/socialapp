import { SET_USER, LOADING_USER, SET_ERRORS } from '../types';
import axios from 'axios';

export const loginUser = (loginData) => (dispach) => {
    dispach({
        type: LOADING_USER
    });
    axios.post('http://localhost:4000/login', loginData)
        .then(res => {
            dispach({
                type: SET_USER,
                payload: res.data
            });
            const auth = {
                token: res.data.data.token,
                role: res.data.data.role.role
            }
            sessionStorage.setItem('auth', JSON.stringify(auth));
        })
        .catch(err => {
            dispach({
                type: SET_ERRORS,
                payload: err
            })
        });
}