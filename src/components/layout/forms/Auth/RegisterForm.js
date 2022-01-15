////////////////////
//// Build
import React from 'react'
import { useForm } from "react-hook-form"
import InputField from "../../../shared/elements/FormElements/InputField";
import RectangleButton from "../../../shared/elements/clickables/RectangleButton/RectangleButton";
import { H1, SubTitle } from "../../../shared/elements/Text";
import { Form, FormWindow } from "../../../shared/elements/Form";


export default function RegisterForm() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    function onSubmit(data) {
        console.log("Your data")
        console.log(data)
    }

    return (
        <FormWindow>
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <H1>
                    Register
                </H1>
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
                    buttonSize="btn--medium"
                    type="submit">
                    SIGN UP
                </RectangleButton>


            </Form>
        </FormWindow>

    )
}




/** Created by ownwindows on 04-01-22 **/
