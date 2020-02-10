import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativTime from 'dayjs/plugin/relativeTime';

const PostsListItem = ({ post: { likes, comments, _id, title, body, createdAt, updatedAt, creator }}) => {
    dayjs.extend(relativTime);
    return (
        <div className="posts-list-item">
            <div className="img-wrapper">
                <img src={creator.image} alt="user" />
            </div>
            <div className="post-details">
                <h3><Link to="#" >{creator.nickName}</Link></h3>
                <span className="date">{dayjs(createdAt).fromNow()}</span>
                <p>{body}</p>
            </div>
        </div>
    )
}

export default PostsListItem;
