////////////////////
//// Build
import React, { useEffect, useState } from 'react'
////////////////////
//// Environmental
import { HeaderImage, PageContainer } from "../../styles/Layout";
import { BackgroundImage, BannerVisual } from "../../styles/Images";
import homeBackground from '../../assets/images/hero_image-black.svg'
import heroBackground from '../../assets/images/wps_half-fill_hero-black.svg'
import CreationForm from "../feature/CreationForm";
import { VisualContainer } from "../../styles/Windows";
import educationBanner from "../../assets/images/banner_education.svg";

export default function Home() {
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);



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
            <VisualContainer>

                <BannerVisual src={ educationBanner }/>
            </VisualContainer>
            <CreationForm/>

        </PageContainer>
    )
}

/** Created by ownwindows on 04-01-22 **/
