import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';
//Redux
import { LIKE_POST, UNLIKE_POST } from '../redux/types';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
//Icons
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
    extendButton: {
        position: 'absolute',
        top: '10px',
        right: '5%'
    },
    dialog: {
        width: '50%'
    },
    card: {
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
        color: '#999',
        marginRight: '1rem'
    },
    content: {
        margin: '1rem 0'
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0
    }
});

const Post = ({ post }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [oldPath, setOldPath] = useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleOpen = () => {
        const localOldPath = window.location.pathname;
        const localNewPath = `users/${user.nickName}/posts/${post._id}`;
        window.history.pushState(null, null, localNewPath);
        setOldPath(localOldPath);
        setOpen(true);
    }

    const handleClose = () => {
        window.history.pushState(null, null, oldPath);
        setOpen(false);
    }

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
            <Tooltip
                title="Pokaż więcej"
                placement="top"
            >
                <IconButton
                    className={classes.extendButton}
                    onClick={handleOpen}
                >
                    <MoreVertIcon
                        color="primary"
                    />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                fullWidth
            >
                <DialogContent>
                    <Card className={classes.card}>
                            <Tooltip
                                title="Zamknij"
                                placement="top"
                            >
                                <IconButton
                                    className={classes.closeButton}
                                    onClick={handleClose}
                                >
                                    <HighlightOffIcon />
                                </IconButton>
                            </Tooltip>
                            <CardMedia
                                image={post.creator.image}
                                className={classes.media}
                            />
                            <CardContent>
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
                                <CardActions>
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
                                           {user.id === post.creator._id && (
                                                <Fragment>
                                                    <Tooltip
                                                        title="Edytuj"
                                                        placement="top"
                                                    >
                                                        <IconButton>
                                                            <EditIcon
                                                                color="primary"
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title="Usuń"
                                                        placement="top"
                                                    >
                                                        <IconButton>
                                                            <DeleteIcon
                                                                color="secondary"
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Fragment>
                                           )}
                                        </Fragment>
                                    )}
                                </CardActions>
                                <Typography
                                    variant="body2"
                                    className={classes.content}
                                >
                                    {post.body}
                                </Typography>
                            </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default Post;
