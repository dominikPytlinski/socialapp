import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import PostsList from '../components/PostsList';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:4000/posts')
            .then(res => {
                setPosts(res.data.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <main className="container">
            <div className="posts">
                {loading ? (
                    <Loading />
                ) : (
                    <PostsList posts={posts} />
                )}
            </div>
            <div className="profile">
                profile
            </div>
        </main>
    )
}

export default Home;
