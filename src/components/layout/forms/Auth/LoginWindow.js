////////////////////
//// Build
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
////////////////////
//// Environmental
import InputField from "../../../shared/elements/FormElements/InputField";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import { UtilityContext } from "../../../../context/UtilityProvider";
import { AuthContext } from "../../../../context/AuthProvider";
import { ButtonBox, Form, FormWindow, InputRow } from "../../../shared/elements/Form";

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
////////////////////
//// External

function LoginWindow() {
    const { hasError, setHasError, setIsLoading } = useContext(UtilityContext);
    const [ error, toggleError ] = useState(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const { login } = useContext(AuthContext);

    // console.log(`login = ${login}`)
    async function onSubmit(event) {
        toggleError(false);
        setIsLoading(true);

        try {

            const result = await axios.post(REACT_APP_AUTH, {
                username: event.username,
                password: event.password,
            });

            console.log(result)
            login(result.data.jwt);

        } catch (e) {
            console.error(e)

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
                <ButtonBox>

                    <RectangleButton
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--medium"
                        type="submit">
                        Login
                    </RectangleButton>
                </ButtonBox>


            </Form>
        </FormWindow>
    )
}




export default LoginWindow;

/** Created by ownwindows on 05-01-22 **/
