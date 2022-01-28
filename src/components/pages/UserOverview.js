////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import { PageContainer, PageHeader } from "../../styles/Layout";
import { DetailContainer, CenteredHeader, CenteredSubHeader, SubTitle } from "../../styles/Typography";
import Logo from "../../assets/images/home_background.png";
import { ProfileImage } from "../../styles/Images";
import { UserListItem } from "../../styles/List";
import { getUsers } from "../../services/controllers/Users";

export default function UserOverview() {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const [ loadedUsers, setLoadedUsers ] = useState();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getData = async () => {
            const response = await getUsers(setHasError, setIsLoading)
            {
                response && setLoadedUsers(response.data.content)
            }
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            <CenteredHeader>
                Users
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
            { loadedUsers &&
                loadedUsers.map((user, index) => {
                    return (
                        <UserListItem key={ index }>
                            <DetailContainer>
                                <CenteredSubHeader> { user.username } </CenteredSubHeader>
                                <span>{ user?.role }</span>
                                <span> { user.email }</span>
                                <span> { user?.description }</span>

                            </DetailContainer>
                            <div>

                            </div>
                            <ProfileImage alt={ user.username } src={ Logo }/>
                        </UserListItem>
                    );
                })
            }
        </PageContainer>
    )
}

/** Created by ownwindows on 04-01-22 **/
