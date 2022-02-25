////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
///////////////////////
//// Environmental
import { useForm } from "react-hook-form"
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { Form, FormBreak, FormError, FormInput, FormInputWrap, FormLabel } from "../../../styles/FormStyles";
import { ButtonBox } from "../../../styles/Form";
import { UtilityContext } from "../../../context/UtilityProvider";
import { registerUser } from "../../../services/controllers/Auth";


export default function AuthRegister() {
    const utilityContext = useContext(UtilityContext);
    const [ registerSucces, setRegisterSucces ] = useState(false);
    const navigate = useNavigate()
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    function onSubmit(event) {

        return registerUser(utilityContext, navigate, setRegisterSucces, event)
        setRegisterSucces(true)
    }

    useEffect(() => {
        return function clearLoader() {
            clearTimeout();
            setRegisterSucces(false)
        };
    }, []);

    return (
        <Form id="loginForm" onSubmit={ handleSubmit(onSubmit) }>
            <FormInputWrap>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="username">Username</label>
                            <FormError role="alert">
                                { errors.username && "Enter your username!" }
                            </FormError>
                        </FormLabel>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="WillPower"
                            { ...register("username", {
                                required: true
                            }) }
                        />
                    </FormInput>
                </FormBreak>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="email">Email</label>
                            <FormError role="alert">
                                { errors.email && "Enter your email address!" }
                            </FormError>
                        </FormLabel>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="..."
                            { ...register("email", {
                                required: true
                            }) }
                        />
                    </FormInput>
                </FormBreak>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="name">Password</label>
                            <FormError role="alert">
                                { errors.password && "Enter your password!" }
                            </FormError>
                        </FormLabel>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            placeholder="..."
                            { ...register("password", {
                                required: true
                            }) }
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
            { registerSucces &&
                <div>
                    <span>You are now a willpowered student!</span>
                </div>
            }
        </Form>

    )
}


/** Created by ownwindows on 04-01-22 **/
