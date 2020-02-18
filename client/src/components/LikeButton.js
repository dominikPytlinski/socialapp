import React, { Fragment } from 'react';
import axios from 'axios';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { LIKE_POST, UNLIKE_POST } from '../redux/types';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//Icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    likeButton: {
        position: 'absolute',
        top: '10px',
        right: '11%'
    }
})

const LikeButton = ({ post, pos }) => {
    const user = useSelector(state => state.user);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleLike = () => {
        const likeData = {
            post: post._id
        }
        axios.post('http://localhost:4000/posts/like', likeData)
            .then(() => {
                const data = {
                    postId: post._id,
                    userId: user.id
                }
                dispatch({
                    type: LIKE_POST,
                    payload: data
                })
            })
            .catch();
    }

    const handleUnlike = () => {
        const unlikeData = {
            post: post._id
        }
        axios.post('http://localhost:4000/posts/unlike', unlikeData)
            .then(() => {
                const data = {
                    postId: post._id,
                    userId: user.id
                }
                dispatch({
                    type: UNLIKE_POST,
                    payload: data
                })
            })
            .catch();
    }

    return (
        <Fragment>
            {user.id !== post.creator._id && (
            post.likes.filter(like => like === user.id).length === 0 ? (
                <Tooltip
                    title="Lubię to"
                    placement="top"
                >
                    <IconButton
                        className={pos && classes.likeButton}
                        onClick={handleLike}
                    >
                        <FavoriteBorderIcon
                            color='primary'
                        />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip
                    title="Nie lubię"
                    placement="top"
                >
                    <IconButton
                        className={pos && classes.likeButton}
                        onClick={handleUnlike}
                    >
                        <FavoriteIcon
                            color='primary'
                        />
                    </IconButton>
                </Tooltip>
            )
            )}
        </Fragment>
    )
}

export default LikeButton;
