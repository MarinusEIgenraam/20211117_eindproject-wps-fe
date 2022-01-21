////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";
import axios from "axios";
import UserListItem from "./UserListItem";
import { PageContainer, PageHeader, UserItem } from "../../shared/styling/Layout";
import { HeaderContainer } from "../../shared/styling/TextLayout";
import { ListWrapper } from "../../shared/styling/List";
import { DetailContainer, H1, H2, SubTitle } from "../../shared/styling/Text";
import Logo from "../../../assets/images/home_background.png";
import { ProfileImage } from "../../shared/styling/Images";

////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;
////////////////////
//// External

export default function UserOverview() {
    const { setIsLoading } = useContext(UtilityContext);
    const [ loadedUsers, setLoadedUsers ] = useState();
    const [ hasError, setHasError ] = useState(false);
    const [ category, setCategory ] = useState(false);

    const API_URL = `${ REACT_APP_API_URL }users`;


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            setHasError(false);
            setIsLoading(true)
            try {
                const result = await axios.get(API_URL, { cancelToken: source.token, });

                setLoadedUsers(result.data.content);
                console.log(loadedUsers)

            } catch (e) {
                console.error(e);
                setHasError(true);
            }
            console.log(loadedUsers)
            setIsLoading(false)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            <H1>
                Users
            </H1>
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
                loadedUsers.map((user) => {
                    return (
                        <UserItem>
                            <DetailContainer>
                                <H2> { user.username } </H2>
                                <span>{ user?.role }</span>
                                <span> { user.email }</span>
                                <span> { user?.description }</span>

                            </DetailContainer>
                            <div>

                            </div>
                            <ProfileImage alt={ user.username } src={ Logo }/>
                        </UserItem>
                    );
                })
            }
        </PageContainer>
    )
}

const NewUsers = styled.div`

`

/** Created by ownwindows on 04-01-22 **/
