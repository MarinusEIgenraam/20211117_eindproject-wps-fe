////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { UtilityContext } from "../../../context/UtilityProvider";
import axios from "axios";
import styled from 'styled-components';
import { Column, PageContainer, PageHeader } from "../../shared/elements/Layout";
import Logo from '../../../assets/images/home_background.png'
import { HeaderContainer } from "../../shared/elements/TextLayout";
import { DetailContainer, H1, H2, SubTitle } from "../../shared/elements/Text";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;
////////////////////
//// External

export default function About() {
    const { setIsLoading } = useContext(UtilityContext);
    const [ loadedAdmins, setLoadedAdmins ] = useState();
    const [ hasError, setHasError ] = useState(false);

    const API_URL = `${ REACT_APP_API_URL }users`;


    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');


        async function getData() {
            setHasError(false);
            setIsLoading(true)


            try {
                const result = await axios.get(API_URL, {
                    cancelToken: source.token
                });

                setLoadedAdmins(result.data.content);
                console.log(loadedAdmins)

            } catch (e) {
                console.error(e);
                setHasError(true);
            }
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

            { loadedAdmins &&
                loadedAdmins.map((admin) => {
                    return (
                        <UserItem>
                            <DetailContainer>
                                <H2> { admin.username } </H2>
                                <span>{ admin?.role }</span>
                                <span> { admin.email }</span>
                                <span> { admin?.description }</span>

                            </DetailContainer>
                            <div>

                            </div>
                            <Image alt={ admin.username } src={ Logo }/>
                        </UserItem>
                    );
                })

            }
        </PageContainer>
    )
}



const Image = styled.img`
  height: calc(1rem * 2 + 12rem);
  aspect-ratio: 1/1;
  border: solid var(--box-border-medium) ${ props => props.theme.border };


`


const UserItem = styled.div`
  width: 70vw;
  height: min-content;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: row;
  transition: all 500ms;
  margin: 25px 25px -180px 25px;
  padding: 1rem;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.45) 0px -20px 20px -20px;


  :hover {
    border: solid var(--box-border-medium) ${ props => props.theme.border };
    box-shadow: ${ props => props.theme.shadow };
    margin: 25px 25px 50px 25px;
    background: ${ props => props.theme.windowBackground };
  }

  @media (min-width: 769px) {

  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

`
/** Created by ownwindows on 04-01-22 **/
