////////////////////
//// Build
import React, { useContext } from 'react'
import styled from 'styled-components';
import LoginWindow from "../../layout/forms/Auth/LoginWindow";
import { AuthContext } from "../../../context/AuthProvider";

////////////////////
//// Environmental

////////////////////
//// External

export default function Home() {
    const { isAuth } = useContext(AuthContext);

    console.log("isAuth")
    console.log(isAuth)
    return (
        <PageContainer>
            {!isAuth && <LoginWindow/> }


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
