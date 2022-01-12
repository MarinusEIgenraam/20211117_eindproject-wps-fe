////////////////////
//// Build
import React, { useContext } from 'react'
import styled from 'styled-components';
import PageContainer from "../../layout/containers/PageContainer";
import { AuthContext } from "../../../context/AuthProvider";
import PageHeader from "../../layout/containers/PageHeader";
import ProjectCreation from "../Projects/ProjectCreation";

////////////////////
//// Environmental

////////////////////
//// External

export default function Portal() {
    const { isAuth, user } = useContext(AuthContext);
    console.log(user)

    return (
        <PageContainer>
            <PageHeader>
                <h1>
                    How are you doing {user.username}
                </h1>
            </PageHeader>
            <ProjectCreation/>
        </PageContainer>
    )
}

const Details = styled.div`

`

/** Created by ownwindows on 04-01-22 **/
