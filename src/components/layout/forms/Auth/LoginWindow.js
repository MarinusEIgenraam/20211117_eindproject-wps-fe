////////////////////
//// Build
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";

////////////////////
//// Environmental
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import { UtilityContext } from "../../../../context/UtilityProvider";
import { AuthContext } from "../../../../context/AuthProvider";
import { ButtonBox,  FormWindow } from "../../../shared/styling/Form";
import {
    Form,
    FormBreak,
    FormError,
    FormInput,
    FormInputWrap,
    FormLabel,
    Heading
} from "../../../shared/styling/FormStyles";

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
////////////////////
//// External

function LoginWindow() {
    const { setIsLoading } = useContext(UtilityContext);
    const [ error, toggleError ] = useState(false);
    const [ succes, toggleSucces ] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const { login } = useContext(AuthContext);

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

    const enterSubmit = (e) => {
        if (e.key === "Enter" && e.shiftKey == false) {
            const data = { content: e.target.value };
            return handleSubmit(onSubmit(data));
        }
    };

    return (
        <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <FormInputWrap>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="name">Username</label>
                            <FormError role="alert">
                                {errors.username && "Enter your username!"}
                            </FormError>
                        </FormLabel>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="WillPower"
                            {...register("username", {
                                required: true})}
                        />
                    </FormInput>
                </FormBreak>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="password">Password</label>
                            <FormError role="alert">
                                {errors.password && "Please provide your correct password!"}
                            </FormError>
                        </FormLabel>
                        <input
                            type="password"
                            onKeyPress={enterSubmit}
                            name="password"
                            id="password"
                            placeholder="......."
                            {...register("password")}
                        />
                    </FormInput>

                </FormBreak>
            </FormInputWrap>
            <ButtonBox>
                <RectangleButton
                    type="submit"
                    buttonSize="btn--large"
                    buttonStyle="btn--primary--solid"
                    disabled={ errors.username || errors.password }
                >
                    Login
                </RectangleButton>
            </ButtonBox>
        </Form>
    )
}



export default LoginWindow;

/** Created by ownwindows on 05-01-22 **/
