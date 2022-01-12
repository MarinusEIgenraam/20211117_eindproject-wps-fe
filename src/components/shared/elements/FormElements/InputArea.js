///////////////////////
//// Built-in
import React, { useState } from 'react';
import styled from 'styled-components'

///////////////////////
//// External

///////////////////////
//// Internal


export default function InputArea({
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
    height,
    width

                                  }) {


    return (
        <InputContainer>
            <Label htmlFor={ labelId }>
                { name }
            </Label>
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

            />
            <ErrorMessage className="error-message">{ errors[inputName] && errors[inputName].message }</ErrorMessage>
        </InputContainer>
    );
};

const Label = styled.label`
  margin-bottom: 1.25rem;
  padding: 0.25rem;

`
const Input = styled.textarea`
  padding: 0.5rem;
  margin-top: 0.25rem;
  color: ${ props => props.theme.text };
  font-weight: 400;
  display: block;
  border: none;
  resize: vertical;
  width: ${ ({ width }) => width ? width : "100%" };
  height: ${ ({ height }) => height ? height : "" };
  &::placeholder{
    color: ${ props => props.theme.sub_text };
  }

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