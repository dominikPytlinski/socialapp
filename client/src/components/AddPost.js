import React, { Fragment } from 'react';
// MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AddPost = () => {
    return (
        <Fragment>
            <Tooltip title="Dodaj post">
                <IconButton>
                    <AddCircleIcon style={{ color: '#fff' }} />
                </IconButton>
            </Tooltip>
        </Fragment>
    )
}

export default AddPost;
