import React from 'react';

const CustomButton = ({ children, color, disabled }) => {
    const className = `btn btn-${color}`;
    return (
        <button className={className} disabled={disabled} >
            {children}
        </button>
    )
}

export default CustomButton;
