import React from 'react';

const CustomInput = ({ type, name, label, onChange, value }) => {
    return (
        <div className="form-group">
            <input type={type} id={name} name={name} required onChange={onChange} value={value} />
            <label htmlFor={name}>{label}</label>
        </div>
    )
}

export default CustomInput;
