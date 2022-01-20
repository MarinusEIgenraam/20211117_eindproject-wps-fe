////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form"
import InputField from "../../../shared/elements/FormElements/InputField";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import { H1, SubTitle } from "../../../shared/elements/Text";
import { Form, FormBreak, FormError, FormInput, FormInputWrap, FormLabel } from "../../../shared/elements/FormStyles";
import styled from "styled-components";
import { ButtonBox } from "../../../shared/elements/Form";
import { AuthContext } from "../../../../context/AuthProvider";
import axios from "axios";
import { UtilityContext } from "../../../../context/UtilityProvider";
///////////////////////
//// Environmental
const { REACT_APP_AUTH_REGISTER } = process.env;



export default function RegisterForm() {
    const { hasError, setHasError, setIsLoading } = useContext(UtilityContext);
    const [ error, toggleError ] = useState(false);
    const [ registerSucces, setRegisterSucces ] = useState(false);
    const navigate = useNavigate()
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    async function onSubmit(event) {
        toggleError(false);
        setIsLoading(true);
        setRegisterSucces(false)

        try {

            const result = await axios.post(REACT_APP_AUTH_REGISTER, {
                username: event.username,
                password: event.password,
                email: event.email,
            });

            console.log(result)

            setRegisterSucces(true)
            setTimeout(() => {
                navigate('/', { replace: false })
            }, 4000);


        } catch (e) {
            console.error(e)

            toggleError(true);
        }

    }

    useEffect(() => {

        return function clearLoader() {
            clearTimeout();
        };
    },[]);

        return (
        <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <FormInputWrap>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="username">Username</label>
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
                            <label htmlFor="email">Email</label>
                            <FormError role="alert">
                                {errors.email && "Enter your email address!"}
                            </FormError>
                        </FormLabel>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="..."
                            {...register("email", {
                                required: true})}
                        />
                    </FormInput>
                </FormBreak>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="name">Password</label>
                            <FormError role="alert">
                                {errors.password && "Enter your password!"}
                            </FormError>
                        </FormLabel>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            placeholder="..."
                            {...register("password", {
                                required: true})}
                        />
                    </FormInput>
                </FormBreak>
            </FormInputWrap>
            <ButtonBox className="hangover">
                <RectangleButton
                    type="button"
                    onClick={ () => reset() }
                    buttonSize="btn--large"
                    buttonStyle="btn--danger--solid"
                >
                    Reset
                </RectangleButton>
                <RectangleButton
                    type="submit"
                    buttonSize="btn--large"
                    buttonStyle="btn--succes--solid"
                    disabled={ errors.username || errors.password }
                >
                    Login
                </RectangleButton>

            </ButtonBox>
            {!registerSucces &&
                <div>
                    <span>You are now a willpowered student!</span>
                </div>
            }
        </Form>

    )
}


/** Created by ownwindows on 04-01-22 **/
