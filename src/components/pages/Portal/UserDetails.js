////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { H2 } from "../../shared/styling/Text";
import { Container } from "../../shared/styling/Layout";
import { Form, FormBreak, FormError, FormInput, FormInputWrap, FormLabel } from "../../shared/styling/FormStyles";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import { ButtonBox, FormWindow } from "../../shared/styling/Form";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";

////////////////////
//// Environmental

////////////////////
//// External

export default function UserDetails() {
    const [ changeUsername, setChangeUsername ] = useState();
    const { user } = useContext(AuthContext);
    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        setValue
    } = useForm({
    });

    console.log(user)
    return (
        <FormWindow>
            <h2 className="centered">
                Settings
            </h2>
            <ButtonBox>
                <RectangleButton
                    type="button"
                    buttonSize="btn--large"
                    buttonStyle="btn--danger--solid"
                >
                    Reset
                </RectangleButton>
                <RectangleButton
                    type="submit"
                    buttonSize="btn--large"
                    buttonStyle="btn--succes--solid"
                    // disabled={ errors }
                >
                    Submit
                </RectangleButton>
            </ButtonBox>
            <Form className="editForm" >
                <FormInputWrap>
                    {changeUsername &&
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
                                    defaultValue={user.username}
                                    {...register("username", {
                                        required: true})}
                                />
                            </FormInput>
                        </FormBreak>
                    }

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
                                defaultValue={user.email}
                                {...register("email", {
                                    required: true})}
                            />
                        </FormInput>
                    </FormBreak>

                </FormInputWrap>
            </Form>

        </FormWindow>
    )
}

const NewUserDetails = styled.div`

`

/** Created by ownwindows on 20-01-22 **/
