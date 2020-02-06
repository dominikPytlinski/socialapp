import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../Components/Loading';
import PostListItem from '../Components/PostListItem';
import Profile from '../Components/Profile';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get('http://localhost:4000/posts')
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    posts: res.data.data
                });
                this.setState({
                    loading: false
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <main className="container">
                <div className="wrapper">
                    <div className="posts">
                        {this.state.loading ? (
                            <Loading />
                        ) : (
                            <PostListItem posts={this.state.posts} />
                        )}
                    </div>
                    <div className="profile">
                        <Profile />
                    </div>
                </div>
            </main>
        )
    }
}

export default Home;
