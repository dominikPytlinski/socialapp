import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import Loading from '../components/Loading';
import PostsList from '../components/PostsList';

const Home = ({ data, getPosts }) => {    
    useEffect(() => {
       getPosts(); 
    }, [getPosts]);
    
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

Home.propTypes = {
    data: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    data: state.data
});

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
