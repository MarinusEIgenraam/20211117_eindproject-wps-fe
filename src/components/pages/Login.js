////////////////////
//// Build
import React from 'react'
import AuthLogin from "../feature/Auth/AuthLogin";
import { PageContainer } from "../../styles/Layout";
import { CenteredHeader, Header } from "../../styles/Typography";

////////////////////
//// Environmental

////////////////////
//// External

export default function Login() {


    return (
        <PageContainer>
            <Header className="centered">

            Login and get to work
            </Header>
            <AuthLogin/>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
