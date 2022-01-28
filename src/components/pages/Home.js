////////////////////
//// Build
import React, { useContext } from 'react'
////////////////////
//// Environmental
import AuthLogin from "../feature/Auth/AuthLogin";
import { AuthContext } from "../../context/AuthProvider";
import { PageContainer } from "../../styles/Layout";
import { BackgroundImage } from "../../styles/Images";
import homeBackground from '../../assets/images/home_background.png'

export default function Home() {
    const { isAuth } = useContext(AuthContext);

    console.log("isAuth")
    console.log(isAuth)
    return (
        <PageContainer>
            { !isAuth && <AuthLogin/> }

            <BackgroundImage alt="home" src={ homeBackground }/>

        </PageContainer>
    )
}

/** Created by ownwindows on 04-01-22 **/
