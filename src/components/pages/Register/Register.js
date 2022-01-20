////////////////////
//// Build
import React from 'react'
import RegisterForm from "../../layout/forms/Auth/RegisterForm";
import LoginWindow from "../../layout/forms/Auth/LoginWindow";
import { PageContainer, PageHeader } from "../../shared/elements/Layout";
import { H1, SubTitle } from "../../shared/elements/Text";

////////////////////
//// Environmental

////////////////////
//// External

export default function Register() {



    return (
        <PageContainer>
            <H1>
                Are you willpowered?
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
            <LoginWindow/>
            <RegisterForm/>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/
