////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { UtilityContext } from "../../context/UtilityProvider";
import { AuthContext } from "../../context/AuthProvider";
import { NavLink, useParams } from "react-router-dom";
////////////////////
//// Environmental
import { FormWindow } from "../../styles/Form";
import { getOneUser } from "../../services/controllers/Users";
import { DetailRow, PageContainer } from "../../styles/Layout";
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

export default function UserProfile() {
    const source = axios.CancelToken.source();
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const [ userDetails, setUserDetails ] = useState('');
    const [ projects, setProjects ] = useState();
    const [ blogs, setBlogs ] = useState();
    const [ profileImage, setProfileImage ] = useState();
    const { username } = useParams();
    const [ userRole, setUserRole ] = useState();


    useEffect(() => {

        const getData = async () => {
            const userUri = `?username=${ username }`
            const userContainer = {
                username: username
            }
            const userData = await getOneUser(setHasError, setIsLoading, username)
            // const userProfileImage = await getProfileImage(setHasError, setIsLoading, username)
            const userProjects = await getProjectsFor(setHasError, setIsLoading, userUri)
            {
                userProjects && setProjects(userProjects.data.content)
            }
            const userBlogs = await getBlogsFor(setHasError, setIsLoading, userContainer)
            {
                userBlogs && setBlogs(userBlogs.data.content)
            }
            console.log(projects)
            setUserDetails(userData.data)
            setUserRole(setRole(userData.data.authorities));

        }

        getData()

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
                        {/*    <User className="on">{ user.username } </User>*/ }
                        {/*)) }*/ }
                        <span>{ userDetails.email }</span>
                    </PrimaryInfo>
                    <SecondaryInfo>
                    </SecondaryInfo>
                </DetailRow>
            </FormWindow>
            { ( projects && projects.length > 0 ) &&
                <>
                    <SubHeader>
                        User projects
                    </SubHeader>
                    <UnsortedList>
                        { projects.map((project, index) => (
                            <ProjectListItem key={ index }>
                                <NavLink to={ `/projects/${ project.projectId }` }><h6> { project.projectName } </h6>
                                </NavLink>

                                <DetailRow>
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
            {(blogs && blogs.length > 0) &&
            <>
                <SubHeader>
                    User blogs
                </SubHeader>
                <UnsortedList>
                    { blogs && blogs.map((blog, index) => (
                        <TaskListItem to={ `/project/${ blog.id }` } key={ index }>
                            <h6> { blog.blogName } </h6>
                            <DetailRow>
                                <h6>{ blog.startTime } <span
                                    className="light">| { blog.blogOwner.username } </span>
                                </h6>
                            </DetailRow>


                        </TaskListItem>
                    )) }
                </UnsortedList>
            </>
            }

        </PageContainer>
    );
}

/** Created by ownwindows on 04-01-22 **/
