import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Components/Loading';

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
                            this.state.posts.map(post => {
                                return (
                                <div key={post._id}>
                                    <img src={post.creator.image} alt="user" className="user-image" />
                                    <div>
                                        <span><Link to="#">{post.creator.nickName}</Link></span>
                                        <h4>{post.title}</h4>
                                        <p>{post.body}</p>
                                    </div>
                                </div>
                                )
                            })
                        )}
                    </div>
                    <div className="profile">
                        profile
                    </div>
                </div>
            </main>
        )
    }
}

export default Home;
