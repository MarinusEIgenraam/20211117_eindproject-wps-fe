////////////////////
//// Build
import React from 'react'
import AuthLogin from "../feature/Auth/AuthLogin";
import { PageContainer } from "../../styles/Layout";
import { CenteredHeader } from "../../styles/Typography";

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
