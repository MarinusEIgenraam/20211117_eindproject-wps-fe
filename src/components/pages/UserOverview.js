////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import { DetailRow, PageContainer, PageHeader } from "../../styles/Layout";
import {
    CenteredHeader,
    DetailContainer, Header,
    Owner,
    PrimaryInfo,
    ProjectMain,
    SecondaryInfo,
    SubTitle
} from "../../styles/Typography";
import { UnsortedList, UserListItem } from "../../styles/List";
import { getUsers } from "../../services/controllers/Users";
import { LinkHeader } from "../../styles/Navigation";

export default function UserOverview() {
    const utilityContext = useContext(UtilityContext);

    const [ pageable, setPageable ] = useState('');
    const [ loadedUsers, setLoadedUsers ] = useState();

    useEffect(() => {
        const source = axios.CancelToken.source();

        getUsers(utilityContext, pageable).then((result) => setLoadedUsers(result.data.content))

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            <Header className="centered">
            Users
            </Header>
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
            <UnsortedList className="userList">
                { loadedUsers &&
                    loadedUsers.map((user, index) => {
                        return (
                            <UserListItem className="userDetails" key={ index }>
                                <ProjectMain>
                                    <DetailContainer className="userListDetails">
                                        <LinkHeader to={ `/users/${ user.username }` }>
                                            { user.username }
                                        </LinkHeader>
                                    </DetailContainer>
                                </ProjectMain>
                                <DetailRow className="users">
                                    <PrimaryInfo>
                                        <Owner>{ user.email }</Owner>
                                    </PrimaryInfo>
                                    <SecondaryInfo>
                                        <span>{ user?.role }</span>
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
