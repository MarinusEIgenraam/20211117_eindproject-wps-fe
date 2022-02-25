////////////////////
//// Build
import React from 'react'
import AuthRegister from "../feature/Auth/AuthRegister";
import { PageContainer, PageHeader } from "../../styles/Layout";
import { CenteredHeader, Header, SubTitle } from "../../styles/Typography";

////////////////////
//// Environmental

////////////////////
//// External

export default function Register() {


    return (
        <PageContainer>
            <Header className="centered">
            Are you willpowered?
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
            <AuthRegister/>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
