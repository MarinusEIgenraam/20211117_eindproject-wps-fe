////////////////////
//// Build
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import RegisterForm from "./RegisterForm";

////////////////////
//// Environmental

////////////////////
//// External

export default function Register() {



    return (
        <PageContainer>
            <RegisterForm/>
        </PageContainer>
    )
}

const PageContainer = styled.div`
      display: flex;
      min-height: 100vh;
      justify-content: center;
      align-items: center;
    `

/** Created by ownwindows on 04-01-22 **/
