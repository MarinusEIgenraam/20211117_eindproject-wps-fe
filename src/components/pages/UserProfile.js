////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { UtilityContext } from "../../context/UtilityProvider";
import { NavLink, useParams } from "react-router-dom";
////////////////////
//// Environmental
import { FormWindow } from "../../styles/Form";
import { getOneUser } from "../../services/controllers/Users";
import { DefaultContainer, DetailRow, PageContainer } from "../../styles/Layout";
import {
    DetailContainer,
    PrimaryInfo,
    ProjectDescription,
    ProjectMain,
    SecondaryInfo,
    SubHeader
} from "../../styles/Typography";
import { getProjectsFor } from "../../services/controllers/Projects";
import { ProjectListItem, TaskListItem, UnsortedList } from "../../styles/List";
import { getBlogsFor } from "../../services/controllers/Blogs";
import { setRole } from "../../services/helpers/filters";
import { ListLink } from "../../styles/Navigation";

export default function UserProfile() {
    const source = axios.CancelToken.source();
    const utilityContext = useContext(UtilityContext);
    const [ userDetails, setUserDetails ] = useState('');
    const [ projects, setProjects ] = useState({});
    const [ blogs, setBlogs ] = useState({});
    const [ profileImage, setProfileImage ] = useState('');
    const { username } = useParams();
    const [ userRole, setUserRole ] = useState('');


    useEffect(() => {

        const pageable = `?username=${ username }`

        getOneUser(utilityContext, username).then((response) => setUserDetails(response.data))
        getProjectsFor(utilityContext, pageable).then((response) => setProjects(response.data.content))
        getBlogsFor(utilityContext, username).then((response) => setBlogs(response.data.content))
        // const userProfileImage = await getProfileImage(utilityContext, username)

        console.log(blogs)
        // setUserRole(setRole(userDetails.authorities));

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            <FormWindow>
                <ProjectMain>
                    <DetailContainer>
                        <h2 className="centered">{ userDetails.username }</h2>
                        {userRole}
                        <ProjectDescription>
                            {/*{ loadedProject.description }*/ }
                        </ProjectDescription>
                    </DetailContainer>
                    {/*<Image className="with-margin" src={ loadedProject.imageUrl }/>*/ }
                </ProjectMain>
                <DetailRow className="users">
                    <PrimaryInfo>
                        {/*<Owner>Project owner: { loadedProject?.projectOwner.username }</Owner>*/ }
                        {/*{ loadedProject?.collaborators.map((user, index) => (*/ }
                        {/*    <User key={index} className="on">{ user.username } </User>*/ }
                        {/*)) }*/ }
                        <span>{ userDetails.email }</span>
                    </PrimaryInfo>
                    <SecondaryInfo>
                    </SecondaryInfo>
                </DetailRow>
            </FormWindow>
            <DefaultContainer>
                { ( projects.length > 0 ) &&
                    <>
                        <SubHeader>
                            User projects
                        </SubHeader>
                        <UnsortedList>
                            { projects.map((project, index) => (
                                <ProjectListItem key={ index }>
                                    <ListLink to={ `/projects/${ project.projectId }` }><h6> { project.projectName } </h6>
                                    </ListLink>

                                    <DetailRow className="listItem">
                                        <h6>{ project.startTime } <span
                                            className="light">| { project.category.name } | { project.projectOwner.username } </span>
                                        </h6>
                                        <h6>
                                            open tasks: { project.projectTaskList.length }
                                        </h6>
                                    </DetailRow>


                                </ProjectListItem>
                            )) }
                        </UnsortedList>
                    </>
                }
            </DefaultContainer>
            <DefaultContainer>
                {(blogs && blogs.length > 0) &&
                    <>
                        <SubHeader>
                            User blogs
                        </SubHeader>
                        <UnsortedList>
                            {blogs.map((blog, index) => (
                                <TaskListItem key={ index }>
                                    <NavLink to={ `/blogs/${ blog.blogId }` }><h6> { blog.blogName }  </h6>
                                    </NavLink>
                                    <DetailRow className="listItem">
                                        <h6>{ blog.startTime } <span
                                            className="light">| { blog.blogOwner.username } </span>
                                        </h6>
                                    </DetailRow>


                                </TaskListItem>
                            )) }
                        </UnsortedList>
                    </>
                }
            </DefaultContainer>

        </PageContainer>
    );
}

/** Created by ownwindows on 04-01-22 **/
