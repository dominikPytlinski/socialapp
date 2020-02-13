import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativTime from 'dayjs/plugin/relativeTime';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    postListItem: {
        marginBottom: '.5rem',
        display: 'flex',
        flexDirection: 'row'
    },
    media: {
        width: 150,
        height: 150
    },
    postDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    dateTime: {
        color: '#999'
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
                    variant="h4"
                    component={Link}
                    to="#"
                    color="primary"
                >
                    {creator.nickName}
                </Typography>
                <Typography
                    variant="caption"
                    className={classes.dateTime}
                >
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography
                    variant="body2"
                >
                    {body}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default PostsListItem;
