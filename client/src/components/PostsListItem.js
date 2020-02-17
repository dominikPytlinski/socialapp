import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
//Redux
import { LIKE_POST, UNLIKE_POST } from '../redux/types';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
//Components
import Post from './Post';

const useStyles = makeStyles({
    postListItem: {
        marginBottom: '.5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    media: {
        width: 150,
        height: 150,
        borderRadius: '50%',
        marginLeft: '1rem'
    },
    postDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    dateTime: {
        color: '#999'
    },
    content: {
        margin: '1rem 0'
    },
    likeButton: {
        position: 'absolute',
        top: '10px',
        right: '11%'
    }
})

const PostsListItem = ({ post }) => {
    dayjs.extend(relativTime);
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
        <Card className={classes.postListItem}>
            <CardMedia
                className={classes.media}
                image={post.creator.image}
                alt="user"
            />
            <CardContent className={classes.postDetails}>
                <Tooltip
                    title={post.creator.nickName}
                    placement="top"
                >
                    <Typography
                        variant="h5"
                        component={Link}
                        to="#"
                        color="primary"
                    >
                        {post.creator.nickName}
                    </Typography>
                </Tooltip>
                <Typography
                    variant="subtitle1"
                >
                    {post.title}
                </Typography>
                <Typography
                    variant="caption"
                    className={classes.dateTime}
                >
                    {dayjs(post.createdAt).fromNow()}
                </Typography>
                <Typography
                    variant="body2"
                    className={classes.content}
                >
                    {post.body}
                </Typography>
                <div style={{ display: 'flex' }}>
                    <Typography
                        variant="caption"
                    >
                        Polubienia: {Object.keys(post.likes).length}
                    </Typography>
                    <Typography
                        variant="caption"
                        style={{ marginLeft: '.5rem' }}
                    >
                        Komentarze: {Object.keys(post.comments).length}
                    </Typography>
                </div>
            </CardContent>
            {user.logged && (
                <Fragment>
                    {user.id !== post.creator._id && (
                        post.likes.filter(like => like === user.id).length === 0 ? (
                            <Tooltip
                                title="Lubię to"
                                placement="top"
                            >
                                <IconButton
                                    className={classes.likeButton}
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
                                    className={classes.likeButton}
                                    onClick={handleUnlike}
                                >
                                    <FavoriteIcon
                                        color='primary'
                                    />
                                </IconButton>
                            </Tooltip>
                        )
                    )}
                    <Post post={post} />
                </Fragment>
            ) }
        </Card>
    )
}

export default PostsListItem;
