////////////////////
//// Build
import React, { useContext } from 'react'
////////////////////
//// Environmental
import { AuthContext } from "../../context/AuthProvider";
import { HeaderImage, PageContainer } from "../../styles/Layout";
import { BackgroundImage } from "../../styles/Images";
import homeBackground from '../../assets/images/hero_image-white.svg'

export default function Home() {
    const { isAuth } = useContext(AuthContext);

    return (
        <PageContainer>
            <HeaderImage>

                <BackgroundImage alt="home" src={ homeBackground }/>
            </HeaderImage>

        </PageContainer>
    )
}

/** Created by ownwindows on 04-01-22 **/
