import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import PostsList from '../components/PostsList';
import { LOADING_DATA, SET_POSTS, SET_ERRORS } from '../redux/types';

const Home = () => {  
    const data = useSelector(state => state.data);
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
                    <PostsList posts={data.posts} />
                )}
            </div>
            <div className="profile">
                profile
            </div>
        </main>
    )
}

export default Home;
