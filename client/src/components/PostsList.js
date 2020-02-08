import React from 'react';
import PostsListItem from './PostsListItem';

const PostsList = (props) => {
    return (
        <div>
            {props.posts.map(post => {
                return <PostsListItem key={post._id} post={post} />
            })}
        </div>
    )
}

export default PostsList;
