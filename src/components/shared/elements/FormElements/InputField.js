///////////////////////
//// Built-in
import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { ThemeContext } from "../../../../context/ThemeProvider";

///////////////////////
//// External

///////////////////////
//// Internal


export default function InputField({
                                       dependencies,
                                       disabled,
                                       labelId,
                                       register,
                                       required,
                                       errors,
                                       type,
                                       name,
                                       inputName,
                                       minLength,
                                       maxLength
                                   }) {
    const [ asDate, setAsDate ] = useState(false);


    return (
        <>
            <label htmlFor={ labelId }>
                { name }
                <Input
                    id={ labelId }
                    type={ type }
                    className={ type }
                    { ...register(inputName, {
                        required: {
                            value: required,
                            message: `${ name } is required`
                        },
                        minLength: {
                            value: minLength,
                            message: `${ name } must be at least ${ minLength } characters long`
                        },
                        maxLength: {
                            value: maxLength,
                            message: `${ name } can not be more then ${ maxLength } characters long`
                        },
                        disabled: disabled,
                        deps: dependencies
                    }) }

                />
            </label>
            { errors[inputName] && <p className="error-message">{ errors[inputName].message }</p> }
        </>
    );
};

const Input = styled.input`
      margin-bottom: 5px;
      padding: 5px;
      color: ${props => props.theme.text};
    `
