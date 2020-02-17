import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
//Components
import CustomButton from './CustomButton';

const useStyles = makeStyles({
    media: {
        width: 150,
        height: 150,
        margin: '1rem auto 0 auto',
        borderRadius: '50%'
    },
    content: {
        textAlign: 'center',
        paddingBottom: 10
    },
    action: {
        display: 'flex',
        justifyContent: 'center'
    },
    buttonWrapper: {
        height: '10vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

const Profile = ({ user }) => {
    const classes = useStyles();

    return (
        <Card>
            {user.logged ? (
                <Fragment>
                    <CardMedia
                        image={user.image}
                        className={classes.media}
                    />
                    <CardContent
                        className={classes.content}
                    >
                        <Typography
                            variant="h5"
                            color="primary"
                        >
                            {user.nickName}
                        </Typography>
                        <Typography
                            variant="caption"
                        >
                            {user.email}
                        </Typography>
                    </CardContent>
                    <CardActions
                        className={classes.action}
                    >
                        <Tooltip
                            title="Zobacz profil"
                            placement="top"
                        >
                            <IconButton
                                color="primary"
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Fragment>
            ) : (
                <div className={classes.buttonWrapper}>
                    <Link to="/login">
                        <CustomButton
                            color="success"
                        >
                            Zaloguj
                        </CustomButton>
                    </Link>
                    <Link to="/signup">
                        <CustomButton
                            color="primary"
                        >
                            Rejestracja
                        </CustomButton>
                    </Link>
                </div>
            )}
        </Card>
    )
}

export default Profile;
