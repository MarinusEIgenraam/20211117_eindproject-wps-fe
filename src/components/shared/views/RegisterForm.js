////////////////////
//// Build
import React, { useContext } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import InputField from "../elements/FormElements/InputField";
import RectangleButton from "../elements/buttons/RectangleButton/RectangleButton";
import { ThemeContext } from "../../../context/ThemeProvider";

export default function RegisterForm() {
    const { theme } = useContext(ThemeContext);
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    function onSubmit(data) {
        console.log("Your data")
        console.log(data)
    }

    const FormWindow = styled.div`
      background: ${ theme.windowBackground };
      padding: 1rem 3rem;
      display: flex;
      flex-direction: column;
      border: solid var(--box-border-medium) ${ theme.border };
      box-shadow: ${ theme.shadow };
      height: max-content;
      max-width: 80vw;
    `
    const Form = styled.form`
      display: flex;
      flex-direction: column;
      padding: 40.41px 30px;

      input {
        font-weight: 400;
        display: block;
        width: 100%;
        border: none;
        min-width: 250px;
        padding-left: 5px;
        outline: var(--tertiary-quarter) solid var(--box-border-thin);
        color: ${ theme.text };
      }
    `
    const SubTitle = styled.small`
      margin-bottom: 30px;
      font-size: 1rem;
      color: ${theme.sub_text};
    `
    const Title = styled.h1`
      margin-bottom: 5px;
      font-size: 2rem;
      font-weight: 700;
    `

    return (
        <FormWindow>
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <Title>
                    Register
                </Title>
                <SubTitle>
                    And join an amazing comunity of willpowered students!
                </SubTitle>
                <InputField
                    type="text"
                    name="Username"
                    inputName="username"
                    register={ register }
                    errors={ errors }
                    required={ true }
                />
                <InputField
                    type="email"
                    name="Email"
                    inputName="email"
                    minLength={ 10 }
                    register={ register }
                    errors={ errors }
                    required={ true }
                />
                <InputField
                    type="password"
                    name="Password"
                    inputName="password"
                    minLength={ 10 }
                    register={ register }
                    errors={ errors }
                    required={ true }
                />
                <RectangleButton
                    buttonStyle="btn--primary--solid"
                    buttonSize="medium"
                    type="submit">
                    SIGN UP
                </RectangleButton>


            </Form>
        </FormWindow>

    )
}


/** Created by ownwindows on 04-01-22 **/
