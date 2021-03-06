import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativTime from 'dayjs/plugin/relativeTime';
//Redux
import { useSelector } from 'react-redux';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
//Components
import Post from './Post';
import LikeButton from './LikeButton';

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
    }
})

const PostsListItem = ({ post }) => {
    dayjs.extend(relativTime);
    const user = useSelector(state => state.user);
    const classes = useStyles();

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
                    <LikeButton post={post} pos={true} />
                    <Post post={post} />
                </Fragment>
            ) }
        </Card>
    )
}

export default PostsListItem;
