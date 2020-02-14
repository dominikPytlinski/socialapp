import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativTime from 'dayjs/plugin/relativeTime';
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
    extendButton: {
        position: 'absolute',
        top: '10px',
        right: '5%'
    },
    likeButton: {
        position: 'absolute',
        top: '10px',
        right: '11%'
    }
})

const PostsListItem = ({ post: { likes, comments, _id, title, body, createdAt, updatedAt, creator }}) => {
    dayjs.extend(relativTime);
    const classes = useStyles();
    return (
        <Card className={classes.postListItem}>
            <CardMedia
                className={classes.media}
                image={creator.image}
                alt="user"
            />
            <CardContent className={classes.postDetails}>
                <Typography
                    variant="h5"
                    component={Link}
                    to="#"
                    color="primary"
                >
                    {creator.nickName}
                </Typography>
                <Typography
                    variant="subtitle1"
                >
                    {title}
                </Typography>
                <Typography
                    variant="caption"
                    className={classes.dateTime}
                >
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography
                    variant="body2"
                    className={classes.content}
                >
                    {body}
                </Typography>
                <div style={{ display: 'flex' }}>
                    <Typography
                        variant="caption"
                    >
                        Polubienia: {Object.keys(likes).length}
                    </Typography>
                    <Typography
                        variant="caption"
                        style={{ marginLeft: '.5rem' }}
                    >
                        Komentarze: {Object.keys(comments).length}
                    </Typography>
                </div>
            </CardContent>
            <Tooltip
                title="Libię to"
                placement="top"
            >
                <IconButton
                    className={classes.likeButton}
                >
                    <FavoriteBorderIcon
                        color='primary'
                    />
                </IconButton>
            </Tooltip>
            <Tooltip
                title="Pokaż więcej"
                placement="top"
            >
                <IconButton
                    className={classes.extendButton}
                >
                    <MoreVertIcon
                        color="primary"
                    />
                </IconButton>
            </Tooltip>
        </Card>
    )
}

export default PostsListItem;
