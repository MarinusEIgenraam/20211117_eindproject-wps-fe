////////////////////
//// Build
import React from 'react'
import RegisterForm from "../../layout/forms/Auth/RegisterForm";
import LoginWindow from "../../layout/forms/Auth/LoginWindow";
import { AppWrapper } from "../../shared/elements/Layout";

////////////////////
//// Environmental

////////////////////
//// External

export default function Register() {



    return (
        <AppWrapper>
            <LoginWindow/>
            <RegisterForm/>
        </AppWrapper>
    )
}


/** Created by ownwindows on 04-01-22 **/
