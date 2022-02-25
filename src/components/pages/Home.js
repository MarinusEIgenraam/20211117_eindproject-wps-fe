////////////////////
//// Build
import React, { useEffect, useState } from 'react'
////////////////////
//// Environmental
import { HeaderImage, PageContainer, USPContainer } from "../../styles/Layout";
import { BackgroundImage, BannerContainer, BannerVisual, WindowVisual } from "../../styles/Images";
import homeBackground from '../../assets/images/hero_image-black.svg'
import heroBackground from '../../assets/images/wps_half-fill_hero-black.svg'
import { VisualContainer } from "../../styles/Windows";
import educationBanner from "../../assets/images/banner_education.svg";
import { TextColumn } from "../../styles/TextLayout";
import classesVisual from "../../assets/images/visual_classes.svg";
import mindfullnessVisual from "../../assets/images/visual_mindfullness.svg";
import teamsVisual from "../../assets/images/visual_teams.svg";
import { Header, SubHeader } from "../../styles/Typography";


export default function Home() {
    const [ isNarrowScreen, setIsNarrowScreen ] = useState(false);


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
    }, [])


    return (
        <PageContainer className="home">
            <HeaderImage>
                { isNarrowScreen ?
                    <BackgroundImage className="hero-logo" src={ heroBackground }/>
                    :
                    <BackgroundImage alt="home" src={ homeBackground }/>
                }

            </HeaderImage>
            <BannerContainer>
                <BannerVisual src={ educationBanner }/>

            </BannerContainer>
            <section id="who-are-we">
                <USPContainer className='left'>
                    <TextColumn>
                        <Header>
                            Who we are
                        </Header>
                        <p>
                            WillPowered Students is a non-profit organisation with the goal to make free knowledge more
                            available and building a community around it. Everyone is welcome to learn share and
                            explore. The
                            goal of our project is to build a place where people can get free access to as much of the
                            available
                            and valid information that is out there. This to close the gap between those that have a
                            degree and
                            those that don’t.
                        </p>
                        <br/>
                        <p>
                            Ideally you could learn with us and then go on to ace your continued education or start your
                            path in
                            the field of your choosing. Skills are more important than credentials. To keep things
                            organized we
                            opted to create a Discord server, it's a bit like a social media platform.
                        </p>
                    </TextColumn>
                    <VisualContainer>

                        <WindowVisual src={ classesVisual }/>
                    </VisualContainer>
                </USPContainer>
            </section>
            <section id="what-do-we-do">
                <USPContainer className='left'>
                    <VisualContainer>

                        <WindowVisual src={ teamsVisual }/>
                    </VisualContainer>
                    <TextColumn>
                        <SubHeader>
                            What do we do
                        </SubHeader>
                        <p>
                            In early 2020 during the COVID pandemic, armed with boredom and a thirst for knowledge a
                            small Discord server was built. Sources from all over the internet were being scoured for
                            free educational resources in order to better ourselves. Soon this small server was being
                            shared with other friends, whom then shared it again. Seeing how we technically created a
                            structured library and recognizing the value of such a thing online. Especially with
                            completely free and open source resources we sought to expand. A new server was created with
                            more structure, we applied to be a non profit and got approved, partnerships were sought out
                            for webhosting and cloud storage for a better workflow. Google and Kualo definitely helped
                            us out when it comes to cloud storage and webhosting respectively and of course Discord for
                            their free platform where all the resources are compiled.
                        </p>
                        <br/>
                        <p>
                            Ideally you could learn with us and then go on to ace your continued education or start your
                            path in
                            the field of your choosing. Skills are more important than credentials. To keep things
                            organized we
                            opted to create a Discord server, it's a bit like a social media platform.
                        </p>
                    </TextColumn>
                </USPContainer>
            </section>
            <section id="what-we-do-for-you">
                <USPContainer className='left'>
                    <TextColumn>

                        <SubHeader>
                            How can you join
                        </SubHeader>
                        <p>
                            Here we have created categories, that you can choose in our "#study-interests" channel. In
                            this channel, you can choose your interests, and click on their reaction button (the emojis)
                            to have them unlocked.
                            We chose the method of assigning user roles to interests as to not be overwhelmed by the
                            vast amount of channels we set up for different topics. Of course you can always check out
                            the rest as well. Per study interest, we have structured links to free sources that you can
                            use to study and learn.

                            We start at the beginner level, so no prior knowledge is required. Whether you’re a lone
                            wolf in search of knowledge or someone who likes to run in a pack. We welcome all in
                            WillPowered Students! To engage with the community we have text and voicechat channels,
                            where you can exchange thoughts, as well as optional channels for your own project!

                            If you have never used discord before, we have a short how-to video on the right of this
                            page. To join all you need to do is click the button or scan the QR-code.
                        </p>
                        <br/>
                        <p>
                            Ideally you could learn with us and then go on to ace your continued education or start your
                            path in
                            the field of your choosing. Skills are more important than credentials. To keep things
                            organized we
                            opted to create a Discord server, it's a bit like a social media platform.
                        </p>
                    </TextColumn>
                    <VisualContainer>
                        <WindowVisual src={ mindfullnessVisual }/>
                    </VisualContainer>
                </USPContainer>
            </section>

        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
