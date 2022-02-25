////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { AiOutlineClose } from "react-icons/all";
////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import {
    Category,
    CenteredHeader,
    Date,
    DetailContainer, Header,
    Owner,
    PrimaryInfo,
    ProjectDescription,
    ProjectMain,
    SecondaryInfo,
    SubTitle,
    User
} from "../../styles/Typography";
import { DetailRow, PageContainer, PageHeader } from "../../styles/Layout";
import { ProjectPageListItem, UnsortedList } from "../../styles/List";
import { Image } from "../../styles/Images";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { AuthContext } from "../../context/AuthProvider";
import ProjectCreate from "../feature/Projects/ProjectCreate";
import { getProjectsFor } from "../../services/controllers/Projects";
import { LinkHeader } from "../../styles/Navigation";

export default function ProjectOverview() {
    const utilityContext = useContext(UtilityContext);
    const { user } = useContext(AuthContext);

    const [ writeProject, setWriteProject ] = useState(false);
    const [ loadedProjects, setLoadedProjects ] = useState([]);
    const [ projectCategory, setProjectCategory ] = useState();
    const [ pageable, setPageable ] = useState('');
    const [ loadCount, setLoadCount ] = useState(6);

    const source = axios.CancelToken.source();


    useEffect(() => {
        if (projectCategory) {
            setPageable(`?categoryId=${ projectCategory }&page=1&size=${ loadCount }`);
        } else {
            setPageable(`?page=0&size=${ loadCount }`)
        }

        console.log(pageable)

        getProjectsFor(utilityContext, pageable).then(response => setLoadedProjects(response.data.content))

        console.log(loadedProjects)

        return function clearData() {
            source.cancel();
        };

    }, [ projectCategory, loadCount ]);

    const renderButton = () => {
        if (user?.authorities === "Project lord" | "Project manager" && !writeProject) {
            return (
                <RectangleButton
                    type="button"
                    onClick={ () => setWriteProject(true) }
                    buttonSize="btn--large"
                    buttonStyle="btn--secondary--solid"
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

    function handlePageable() {
        setLoadCount(loadCount + 6)
    }

    return (
        <PageContainer>
            <Header className="centered">
                Projects
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
            { renderButton() }
            { writeProject &&
                <ProjectCreate setEdit={ setWriteProject }/>
            }
            <UnsortedList>
                { loadedProjects && loadedProjects.map((project, index) => (
                    <ProjectPageListItem key={ index }>
                        <ProjectMain>

                            <DetailContainer>
                                <LinkHeader to={ `/projects/${ project.projectId }` }>
                                    { project.projectName }
                                </LinkHeader>
                                <ProjectDescription>
                                    { project.description }
                                </ProjectDescription>


                            </DetailContainer>
                            <Image className="with-margin" src={ project.imageUrl }/>
                        </ProjectMain>


                        <DetailRow className="users">
                            <PrimaryInfo>
                                <Owner>{ project.projectOwner.username } | </Owner>
                                { project?.collaborators.map((user, index) => (
                                    <User key={ index } className="on">{ user.username } </User>
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
            { ( loadedProjects && loadedProjects.length >= 6 ) &&
                <RectangleButton onClick={ handlePageable } buttonSize="btn btn--medium"
                                 buttonStyle="btn--special--outline">
                    Load more
                </RectangleButton>
            }
        </PageContainer>
    )
}


/** Created by ownwindows on 18-01-22 **/
