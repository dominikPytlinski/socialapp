import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import PostsList from '../components/PostsList';
import { LOADING_DATA, SET_POSTS, SET_ERRORS, STOP_LOADING_DATA } from '../redux/types';

const Home = () => {  
    const data = useSelector(state => state.data);
    const user = useSelector(state => state.user);
    const UI = useSelector(state => state.UI);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOADING_DATA
        });
        axios.get('http://localhost:4000/posts')
            .then(res => {
                dispatch({
                    type: SET_POSTS,
                    payload: res.data.data
                })
            })
            .catch(err => {
                dispatch({
                    type: STOP_LOADING_DATA
                })
                dispatch({
                    type: SET_ERRORS,
                    payload: err
                });
                console.log(err);
            });
    }, [dispatch]);
    
    return (
        <main className="container">
            <div className="posts">
                {data.loading ? (
                    <Loading />
                ) : (
                    UI.errors ? (
                        <div>{UI.errors.message}</div>
                    ) : (
                        <PostsList posts={data.posts} />
                    )
                )}
            </div>
            <div className="profile">
                profile
            </div>
        </main>
    )
}

export default Home;
