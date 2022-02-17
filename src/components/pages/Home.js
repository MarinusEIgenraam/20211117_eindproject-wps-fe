////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
////////////////////
//// Environmental
import { AuthContext } from "../../context/AuthProvider";
import { HeaderImage, PageContainer } from "../../styles/Layout";
import { BackgroundImage } from "../../styles/Images";
import homeBackground from '../../assets/images/hero_image-black.svg'
import heroBackground from '../../assets/images/wps_half-fill_hero-black.svg'
import CreationForm from "../feature/CreationForm";

export default function Home() {
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);
    const { isAuth } = useContext(AuthContext);



    useEffect(() => {
        const mediaWatcher = window.matchMedia("(max-width: 500px)")
        setIsNarrowScreen(mediaWatcher.matches);

        function updateIsNarrowScreen(e) {
            setIsNarrowScreen(e.matches);
        }
        mediaWatcher.addEventListener('change', updateIsNarrowScreen)

        return function cleanup() {
            mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
        }
    },[])



    return (
        <PageContainer className="home">
            <HeaderImage>
                {isNarrowScreen ?
                    <BackgroundImage className="hero-logo" src={heroBackground}/>
                    :
                    <BackgroundImage alt="home" src={ homeBackground }/>
                }

            </HeaderImage>
            <CreationForm/>

        </PageContainer>
    )
}

/** Created by ownwindows on 04-01-22 **/
