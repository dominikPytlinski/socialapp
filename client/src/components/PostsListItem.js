import React from 'react';
import { Link } from 'react-router-dom';

const PostsListItem = (props) => {
    const { likes, comments, _id, title, body, cratedAt, updatedAt, creator } = props.post;
    return (
        <div className="posts-list-item">
            <div className="img-wrapper">
                <img src={creator.image} alt="user" />
            </div>
            <div className="post-details">
                <h3><Link to="#" >{creator.nickName}</Link></h3>
                <p>{body}</p>
            </div>
        </div>
    )
}

export default PostsListItem;
