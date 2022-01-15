////////////////////
//// Dependencies
import React from 'react';
import { Focus, Option, Select, SelectContainer } from "../../Input";

////////////////////
//// Internal

////////////////////
//// External


const STYLES = [
    "drop--primary--solid",
    "drop--primary--transparant",
];

export default function Dropdown({ value, data, placeholder, listStyle, onChange }) {
    const checkListStyle = STYLES.includes(listStyle) ? listStyle : STYLES[0];

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value);
        console.log(value);

    };

    console.log(data);
    return (
        <SelectContainer>
            <Select
                value={ value }
                className={ `drop ${ checkListStyle }` }
                onChange={ handleChange }>
                <Option value=''>{ placeholder }</Option>
                {data[0] && data[0].map((item, key) => {
                    return (
                        <Option
                            key={ key }
                            value={ item.value }>
                            { item.label }
                        </Option>
                    )
                }) }

                <Focus className='focus'></Focus>
            </Select>

        </SelectContainer>
    );
};



/** Created by ownwindows on 18-11-21 **/