///////////////////////
//// Built-in
import React from 'react';
import { Input, InputContainer, InputLabel, InputMultiLine } from "../../styling/Input";
import { ErrorMessage } from "../../styling/Text";

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
            <InputLabel htmlFor={ labelId }>
                { name }
            </InputLabel>
            <div>

                <InputMultiLine
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
            </div>
        </InputContainer>
    );
};

