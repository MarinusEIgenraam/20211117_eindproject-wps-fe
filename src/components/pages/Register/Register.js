////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import RegisterForm from "../../layout/forms/RegisterForm";
import LoginWindow from "../../layout/forms/LoginWindow";
import PageContainer from "../../layout/containers/PageContainer";

////////////////////
//// Environmental

////////////////////
//// External

export default function Register() {



    return (
        <PageContainer>
            <LoginWindow/>
            <RegisterForm/>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
