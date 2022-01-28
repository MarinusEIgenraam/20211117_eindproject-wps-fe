////////////////////
//// Build
import React, { useContext } from 'react'
import styled from 'styled-components';
import LoginWindow from "../layout/forms/Auth/LoginWindow";
import { AuthContext } from "../../context/AuthProvider";
import { PageContainer} from "../shared/styling/Layout";
import { BackgroundImage, Img } from "../shared/styling/Images";

////////////////////
//// Environmental
import homeBackground from '../../assets/images/home_background.png'

////////////////////
//// External

export default function Home() {
    const { isAuth } = useContext(AuthContext);

    console.log("isAuth")
    console.log(isAuth)
    return (
        <PageContainer>
            {!isAuth && <LoginWindow/> }

            <BackgroundImage alt="home" src={homeBackground}/>

        </PageContainer>
    )
}



/** Created by ownwindows on 04-01-22 **/
