////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { AiOutlineClose } from "react-icons/all";
////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import {
    DetailContainer,
    CenteredHeader,
    SubTitle,
    Owner,
    Users,
    User,
    ProjectDescription, ProjectMain, Category, Date, SecondaryInfo, PrimaryInfo
} from "../../styles/Typography";
import { DetailRow, Divider, PageContainer, PageHeader } from "../../styles/Layout";
import { ProjectPageListItem, UnsortedList } from "../../styles/List";
import { Image } from "../../styles/Images";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { AuthContext } from "../../context/AuthProvider";
import ProjectCreate from "../feature/Projects/ProjectCreate";
import { getProjectsFor } from "../../services/controllers/Projects";
import { ProjectCardLink, ProjectLink } from "../../styles/Navigation";

export default function ProjectOverview() {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const { user } = useContext(AuthContext);
    const [ writeProject, setWriteProject ] = useState(false);
    const [ requestUri, setRequestUri ] = useState('');
    const [ loadedProjects, setLoadedProjects ] = useState();
    const [ projectCategory, setProjectCategory ] = useState('');

    const source = axios.CancelToken.source();


    useEffect(() => {
        if (projectCategory) {
            setRequestUri(`?categoryId=${ projectCategory }`)
        }

        const getData = async () => {
            const response = await getProjectsFor(setHasError, setIsLoading, requestUri)
            {
                response && setLoadedProjects(response.data.content)
            }
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ projectCategory ]);

    const renderButton = () => {
        if (user?.authorities === "Project lord" | "Project manager" && !writeProject) {
            return (
                <RectangleButton
                    type="button"
                    onClick={ () => setWriteProject(true) }
                    buttonSize="btn--large"
                    buttonStyle="btn--danger--solid"
                >
                    NEW
                </RectangleButton>
            );
        } else if (user?.authorities === "Project lord" | "Project manager" && writeProject) {
            return (
                <AiOutlineClose onClick={ () => setWriteProject(false) } size={ 30 }/>
            );
        }
    }


    return (
        <PageContainer>
            <CenteredHeader>
                Projects
            </CenteredHeader>
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
            { renderButton() }
            { writeProject &&
                <ProjectCreate/>
            }
            <UnsortedList>
                { loadedProjects && loadedProjects.map(project => (
                    <ProjectPageListItem key={ project.id }>
                        <ProjectMain>

                            <DetailContainer>
                                <ProjectCardLink to={ `/projects/${ project.projectId }` }>
                                    { project.projectName }
                                </ProjectCardLink>
                                <ProjectDescription>
                                    {project.description}
                                </ProjectDescription>



                            </DetailContainer>
                            <Image className="with-margin" src={ project.imageUrl }/>
                        </ProjectMain>



                        <DetailRow className="users">
                            <PrimaryInfo>
                                <Owner>{ project.projectOwner.username } | </Owner>
                                { project?.collaborators.map((user, index) => (
                                    <User className="on">{ user.username } </User>
                                )) }
                            </PrimaryInfo>
                            <SecondaryInfo>
                                <Category>{ project.category.name }</Category>
                                <Date>{ project.startTime }</Date>
                            </SecondaryInfo>
                        </DetailRow>
                    </ProjectPageListItem>
                )) }
            </UnsortedList>

        </PageContainer>
    )
}


/** Created by ownwindows on 18-01-22 **/
