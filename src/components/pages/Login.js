////////////////////
//// Build
import React from 'react'
import AuthRegister from "../feature/Auth/AuthRegister";
import AuthLogin from "../feature/Auth/AuthLogin";
import { PageContainer, PageHeader } from "../../styles/Layout";
import { CenteredHeader, SubTitle } from "../../styles/Typography";

////////////////////
//// Environmental

////////////////////
//// External

export default function Login() {


    return (
        <PageContainer>
            <CenteredHeader>
                Login and get to work
            </CenteredHeader>
            <AuthLogin/>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
