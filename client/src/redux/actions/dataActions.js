import { LOADING_DATA, SET_POSTS, SET_ERRORS } from '../types';
import axios from 'axios';

export const getPosts = () => (dispach) => {
    dispach({
        type: LOADING_DATA
    });
    axios.get('http://localhost:4000/posts')
        .then(res => {
            dispach({
                type: SET_POSTS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispach({
                type: SET_ERRORS,
                payload: err
            });
            console.log(err);
        });
}
