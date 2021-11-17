///////////////////////
//// Internal
import React, {useState} from 'react';

///////////////////////
//// External
import PropTypes from 'prop-types';

///////////////////////
//// Internal
import './Inputfield.css';
import {validateInput} from "src/validator/Validator";

const Inputfield = ({value, label, placeholder, validators, type, onChange, className}) => {
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const value = event.target;
        setError(validateInput(validators, value));
        onChange(value);
    };
    return (
        <>
            {label && <label htmlFor="app-input-field">{label}</label>}
            <input
                type="text"
                value={value}
                className={className}
                placeholder={placeholder}
                onChange={handleChange}/>
            {error && <span className="text-danger">{error.message}</span>}
        </>
    )
};

export default Inputfield;

Inputfield.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    validators: PropTypes.array,
    type: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Inputfield.defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    validators: '',
    type: 'text',
    className: '',
    onChange: [],
};

// thank to: https://www.youtube.com/watch?v=HIFxC7Gkgfo&t=284s&ab_channel=CodeWithGhazi