///////////////////////
//// Built-in
import React, { useState } from 'react';
import { ErrorMessage } from "../Text";
import styled from "styled-components";

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
                                       placeholder,
                                       maxLength,
                                       onChange
                                   }) {
    const [ asDate, setAsDate ] = useState(false);


    return (
        <InputContainer>
            <InputLabel htmlFor={ labelId }>
                { name }
            </InputLabel>
            <div>


                <Input
                    id={ labelId }
                    type={ type }
                    className={ type }
                    placeholder={ placeholder }
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
                    onChange={ onChange }

                />
                <ErrorMessage
                    className="error-message">{ errors[inputName] && errors[inputName].message }</ErrorMessage>
            </div>
        </InputContainer>
    );
};


export const InputContainer = styled.li`
  list-style-type: none;

  color: ${ props => props.theme.text };
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &:not(:last-child) {
    //margin-bottom: 20px;
  }
`

const InputLabel = styled.label`
  padding: 0.25rem;
  
`

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  min-height: 31px;

  margin-top: 0.25rem;
  color: ${ props => props.theme.text };
  font-weight: 400;
  border: none;
  background-color: transparent;


  outline: ${ props => props.theme.createBorder }  solid var(--box-border-thin);
  color: ${ props => props.theme.text };

  &::placeholder {
    color: ${ props => props.theme.createSubText };
  }
`
