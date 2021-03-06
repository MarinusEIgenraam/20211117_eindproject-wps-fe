////////////////////
//// Build
import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
////////////////////
//// Environmental
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { UtilityContext } from "../../../context/UtilityProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { ButtonBox } from "../../../styles/Form";
import { Form, FormBreak, FormError, FormInput, FormInputWrap, FormLabel } from "../../../styles/FormStyles";
import { loginUser } from "../../../services/controllers/Auth";

function AuthLogin() {
    const utilityContext = useContext(UtilityContext);
    const { login } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    function onSubmit(event) {
        console.log(event)
        return loginUser(utilityContext, login, event)
    }


    return (
        <Form id="loginForm" onSubmit={ handleSubmit(onSubmit) }>
            <FormInputWrap>
                <FormBreak>
                    <FormInput>
                        <FormLabel>
                            <label htmlFor="name">Username</label>
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
                            <label htmlFor="password">Password</label>
                            <FormError role="alert">
                                { errors.password && "Please provide your correct password!" }
                            </FormError>
                        </FormLabel>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="......."
                            { ...register("password") }
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


export default AuthLogin;

/** Created by ownwindows on 05-01-22 **/
