////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import axios from "axios";
////////////////////
//// Environmental
import InputField from "../../shared/elements/FormElements/InputField";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
////////////////////
//// External

export default function Login() {
    const { hasError, setHasError } = useContext(UtilityContext);
    const [ error, toggleError ] = useState(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const { loginUser } = useContext(AuthContext);

    async function onSubmit(e, loginUser) {
        console.log(`username: ${e.username}, password: ${e.password}`)
        toggleError(false);

        try {
            const result = await axios.post(REACT_APP_AUTH, {
                username: e.username,
                password: e.password,
            });

            console.log("result:")
            console.log(result.data.jwt);
            // localStorage.setItem('token', result.data.jwt);

            loginUser(result.data.jwt);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }


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
                    type="password"
                    name="Password"
                    inputName="password"
                    register={ register }
                    errors={ errors }
                    required={ true }

                />
                <RectangleButton
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--medium"
                    type="submit">
                    Login
                </RectangleButton>


            </Form>
        </FormWindow>
    )
}

const FormWindow = styled.div`
  align-items: center;
  background: ${ props => props.theme.windowBackground };
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  box-shadow: ${ props => props.theme.shadow };
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
    color: ${ props => props.theme.text };
  }
`
const SubTitle = styled.small`
  margin-bottom: 30px;
  font-size: 1rem;
  color: ${ props => props.theme.text };
`
const Title = styled.h1`
  margin-bottom: 5px;
  font-size: 2rem;
  font-weight: 700;
`

/** Created by ownwindows on 05-01-22 **/
