import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
//MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationsIcon from '@material-ui/icons/Notifications';
//Components
import AddPost from './AddPost';
 
const Header = ({ user, logoutUser }) => {
    return (
        <header className="header">
            <div className="logo">
                <span>Logo</span>
            </div>
            <div className="main-nav">
                {user.logged ? (
                    <ul className="main-menu">
                        <li className="main-menu-item">
                            <Tooltip title="Główna">
                                <IconButton component={Link} to="/">
                                    <HomeIcon style={{ color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </li>
                        <li className="main-menu-item">
                            <Tooltip title="Powiadomienia" >
                                <IconButton>
                                    <NotificationsIcon style={{ color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </li>
                        <li className="main-menu-item">
                            <AddPost />
                        </li>
                        <li className="main-menu-item">
                            <Tooltip title="Wyloguj" >
                                <IconButton
                                    onClick={(e) => logoutUser()}
                                >
                                    <PowerSettingsNewIcon
                                        style={{ color: '#fff' }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </li>
                    </ul>
                ) : (
                    <ul className="main-menu">
                        <li className="main-menu-item">
                            <Tooltip title="Główna" >
                                <IconButton component={Link} to="/">
                                    <HomeIcon style={{ color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </li>
                        <li className="main-menu-item">
                            <Tooltip title="Logowanie">
                                <IconButton component={Link} to="/login">
                                    <InputIcon style={{ color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </li>
                        <li className="main-menu-item">
                            <Tooltip title="Rejestracja">
                                <IconButton component={Link} to="/signup">
                                    <PersonAddIcon style={{ color: '#fff' }} />
                                </IconButton>   
                            </Tooltip>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToPropas = state => ({
    user: state.user
});

export default connect(mapStateToPropas, { logoutUser })(Header);

