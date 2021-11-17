

import React from 'react';
import {validateInput} from '../../../validator/Validator';
import './Inputfield.css'

const Inputfield = ({label,placeholder, className, value, validators, onChange}) => {

    const handleChange = (event) => {
        const value = event.target;
        const error = validateInput(validators, value);
    };
    return (
        <>
            {label && <label htmlFor="app-input-field">{label}</label>}
            <input
                type="text"
                className={className}
                placeholder={placeholder}
                onChange={handleChange}/>
        </>
    )
};

export default Inputfield;


// thank to: https://www.youtube.com/watch?v=HIFxC7Gkgfo&t=284s&ab_channel=CodeWithGhazi