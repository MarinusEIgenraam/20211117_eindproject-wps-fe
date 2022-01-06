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
        <InputContainer>
            <Label htmlFor={ labelId }>
                { name }
            </Label>
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
            <ErrorMessage className="error-message">{ errors[inputName] && errors[inputName].message }</ErrorMessage>
        </InputContainer>
    );
};

const Label = styled.label`
  margin-bottom: 1.25rem;
  padding: 0.25rem;

`
const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.25rem;
  color: ${ props => props.theme.text };
  font-weight: 400;
  display: block;
  border: none;
  width: 100%;

  outline: var(--tertiary-quarter) solid var(--box-border-thin);
  color: ${ props => props.theme.text };
`

const InputContainer = styled.div`
  color: ${ props => props.theme.text };
  flex-grow: 1;
  width: 100%;
`

const ErrorMessage = styled.p`
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  font-size: 0.8rem;
  min-height: 18px;
  color: ${ props => props.theme.sub_text };

`