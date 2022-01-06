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
import { UtilityContext } from "../../../context/UtilityProvider";
import { AuthContext } from "../../../context/AuthProvider";

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
////////////////////
//// External

function LoginWindow() {
    const { hasError, setHasError, setIsLoading } = useContext(UtilityContext);
    const [ error, toggleError ] = useState(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const { userLogin, isAuth } = useContext(AuthContext);

    async function onSubmit(event) {
        toggleError(false);
        setIsLoading(true);

        try {

            const result = await axios.post(REACT_APP_AUTH, {
                username: event.username,
                password: event.password,
            });


            console.log(result)
            userLogin(result.data.jwt);

        } catch (e) {
            console.error(error)

            toggleError(true);
        }

    }


    return (
        <FormWindow>
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <InputRow>

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
                </InputRow>
                <ButtonRow>

                    <RectangleButton
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--medium"
                        type="submit">
                        Login
                    </RectangleButton>
                </ButtonRow>


            </Form>
        </FormWindow>
    )
}

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -20px;

`
const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  position: relative;
  top: -10px;
`

const FormWindow = styled.div`
  align-self: start;
  margin-top: 10vh;
  align-items: center;
  padding: 0 1rem;
  background: ${ props => props.theme.windowBackground };
  display: flex;
  flex-direction: column;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  box-shadow: ${ props => props.theme.shadow };
  height: 10vh;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  //padding: 1.5rem 1.5rem;


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
export default LoginWindow;

/** Created by ownwindows on 05-01-22 **/
