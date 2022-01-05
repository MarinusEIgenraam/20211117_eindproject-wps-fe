////////////////////
//// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

////////////////////
//// Internal
import './Dropdown.scss'

////////////////////
//// External

const STYLES = [
    "drop--primary--solid",
    "drop--primary--transparant",
];

const Dropdown = ({value, data, placeholder, listStyle, onChange}) => {
    const checkListStyle = STYLES.includes(listStyle) ? listStyle : STYLES[0];

    const handleChange = (event) => {
        const {value} = event.target;
        onChange(value);
        console.log(value);

    };

    return (
        <div className='select'>
            <select
                value={value}
                className={`drop ${checkListStyle}`}
                onChange={handleChange}>
                <option value=''>{placeholder}</option>
                {data.map((item, key) => (
                    <option
                        key={key}
                        value={item.value}>
                        {item.label}
                    </option>
                ))}
                <span className='focus'></span>
            </select>

        </div>
    );
};

Dropdown.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
    value: '',
    placeholder: '',
    className: '',
}

export default Dropdown;

/** Created by ownwindows on 18-11-21 **/