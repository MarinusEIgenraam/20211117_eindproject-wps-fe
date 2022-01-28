////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/AuthProvider";
import CreateProject from "../layout/forms/Project/CreateProject";
import CreateBlog from "../layout/forms/Blog/CreateBlog";
import { HeaderContainer } from "../shared/styling/TextLayout";
import { H1 } from "../shared/styling/Text";
import { Divider, PageContainer } from "../shared/styling/Layout";
import ListProject from "./Portal/ListProject";
import styled from 'styled-components';
import TaskList from "./Portal/TaskList";
import ListBlog from "./Portal/ListBlog";
import UserDetails from "./Portal/UserDetails";


////////////////////
//// Environmental

////////////////////
//// External

export default function Portal() {
    const [ editCount, setEditCount ] = useState(0);
    const { isAuth, user } = useContext(AuthContext);
    console.log(editCount)
    useEffect(() => {


    }, [ editCount ]);
    return (
        <PageContainer>
            <H1>
                Welcome back { user.username }
                <Divider className="small"/>
            </H1>

            <UserDetails/>

            { ( user.authorities === "Project lord" ) &&
                <>
                    <ListBlog/>
                    <Divider className="rounded"/>
                </>
            }
            <TaskList editCount={editCount} setEditCount={setEditCount}/>
            <Divider className="rounded"/>
            <ListProject/>
            <Divider className="rounded"/>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/

