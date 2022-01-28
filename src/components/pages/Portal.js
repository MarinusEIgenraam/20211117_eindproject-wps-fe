////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
////////////////////
//// Environmental
import { AuthContext } from "../../context/AuthProvider";
import { CenteredHeader } from "../../styles/Typography";
import { Divider, PageContainer } from "../../styles/Layout";
import ProjectList from "../feature/Projects/ProjectList";
import TaskList from "../feature/Tasks/TaskList";
import BlogList from "../feature/Blogs/BlogList";
import PortalUserDetails from "../feature/Portal/PortalUserDetails";


export default function Portal() {
    const [ editCount, setEditCount ] = useState(0);
    const { user } = useContext(AuthContext);

    useEffect(() => {
    }, [ editCount ]);

    return (
        <PageContainer>
            <CenteredHeader>
                Welcome back { user.username }
                <Divider className="small"/>
            </CenteredHeader>

            <PortalUserDetails/>

            { ( user.authorities === "Project lord" ) &&
                <>
                    <BlogList/>
                    <Divider className="rounded"/>
                </>
            }
            <TaskList editCount={ editCount } setEditCount={ setEditCount }/>
            <Divider className="rounded"/>
            <ProjectList/>
            <Divider className="rounded"/>
        </PageContainer>
    )
}


/** Created by ownwindows on 04-01-22 **/

