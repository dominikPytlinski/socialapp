import React, { Fragment } from 'react';
//Redux
import { useSelector } from 'react-redux';
//MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ActionButtons = ({ post }) => {
    const user = useSelector(state => state.user);

    return (
        <Fragment>
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
    )
}

export default ActionButtons;
