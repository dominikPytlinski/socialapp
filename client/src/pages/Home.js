import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import Loading from '../components/Loading';
import PostsList from '../components/PostsList';

const Home = (props) => {
    const { data: { loading, posts }, getPosts} = props;
    
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    
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

Home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
});

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
