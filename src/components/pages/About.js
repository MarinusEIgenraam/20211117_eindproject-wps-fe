////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import { DetailRow, PageContainer, PageHeader } from "../../styles/Layout";
import Logo from '../../assets/images/home_background.png'
import {
    CenteredHeader,
    DetailContainer,
    PrimaryInfo,
    ProjectMain,
    SecondaryInfo,
    SubTitle,
    User
} from "../../styles/Typography";
import { Image } from "../../styles/Images";
import { UnsortedList, UserListItem } from "../../styles/List";
import { getAdmins } from "../../services/controllers/Users";

export default function About() {
    const utilityContext = useContext(UtilityContext);
    const [ loadedAdmins, setLoadedAdmins ] = useState();


    useEffect(() => {
        const source = axios.CancelToken.source();

        getAdmins(utilityContext).then(response => setLoadedAdmins(response.data.content))
        console.log(loadedAdmins)

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            <CenteredHeader>
                About
            </CenteredHeader>
            <SubTitle>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </SubTitle>
            <PageHeader>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, nam, unde. Ad aspernatur deserunt,
                odit quia rerum tempore ut. Aliquid culpa facilis ipsa minus. Adipisci architecto, atque deserunt
                ducimus eligendi expedita hic laudantium necessitatibus nesciunt, non obcaecati quis, repellat saepe sed
                velit. Adipisci amet animi debitis dolor dolores eaque iusto laboriosam magni omnis pariatur possimus
                reprehenderit, sed soluta, tempore voluptatibus.
            </PageHeader>

            <UnsortedList>
                { loadedAdmins &&
                    loadedAdmins.map((admin, index) => {
                        return (
                            <UserListItem key={ index }>
                                <ProjectMain>
                                    <DetailContainer>
                                        {/*<LinkHeader to={ `/users/${ admin.username }` }>*/}
                                        {/*    { admin.username }*/}
                                        {/*</LinkHeader>*/}
                                    </DetailContainer>
                                    <Image alt={ admin.username } src={ Logo }/>
                                </ProjectMain>
                                    <DetailRow className="users">
                                        <PrimaryInfo>
                                                <User className="on">{ admin.email } </User>
                                        </PrimaryInfo>
                                        <SecondaryInfo>
                                        </SecondaryInfo>
                                    </DetailRow>
                            </UserListItem>
                        );
                    })
                }
            </UnsortedList>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
