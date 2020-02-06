import React from 'react';
import { Link } from 'react-router-dom';

const PostListItem = (props) => {
    return (
        props.posts.map(post => {
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
    )
}

export default PostListItem;
