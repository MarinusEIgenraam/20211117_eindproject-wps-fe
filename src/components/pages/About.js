////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import { PageContainer, PageHeader } from "../../styles/Layout";
import Logo from '../../assets/images/home_background.png'
import { DetailContainer, H1, H2, SubTitle } from "../../styles/Typography";
import { Image } from "../../styles/Images";
import { UnsortedList, UserListItem } from "../../styles/List";
import { getAdmins } from "../../services/controllers/Users";

export default function About() {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const [ loadedAdmins, setLoadedAdmins ] = useState();

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getData() {
            const result = await getAdmins(setHasError, setIsLoading);
            {
                result && setLoadedAdmins(result.data.content)
            }
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            <H1>
                About
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

            <UnsortedList>
                { loadedAdmins &&
                    loadedAdmins.map((admin, index) => {
                        return (
                            <UserListItem key={ index }>
                                <DetailContainer>
                                    <H2> { admin.username } </H2>
                                    <span>{ admin?.role }</span>
                                    <span> { admin.email }</span>
                                    <span> { admin?.description }</span>

                                </DetailContainer>
                                <div>

                                </div>
                                <Image alt={ admin.username } src={ Logo }/>
                            </UserListItem>
                        );
                    })
                }
            </UnsortedList>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
