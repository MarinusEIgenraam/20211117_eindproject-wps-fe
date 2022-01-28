////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { AiOutlineClose } from "react-icons/all";
////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import { DetailContainer, H1, SubTitle } from "../../styles/Typography";
import { PageContainer, PageHeader } from "../../styles/Layout";
import { ProjectListItem, UnsortedList } from "../../styles/List";
import { Image } from "../../styles/Images";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { AuthContext } from "../../context/AuthProvider";
import ProjectCreate from "../feature/Projects/ProjectCreate";
import { getProjectsFor } from "../../services/controllers/Projects";

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
        console.log(loadedProjects)

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
            <H1>
                Projects
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
            { renderButton() }
            { writeProject &&
                <ProjectCreate/>
            }
            <UnsortedList>
                { loadedProjects && loadedProjects.map(project => (
                    <ProjectListItem to={ `/project/${ project.id }` } key={ project.id }>
                        <DetailContainer>
                            <h4> { project.projectName } </h4>

                            <span>{ project.category.name }</span>
                            <span>{ project.projectOwner.username }</span>
                            <span>{ project.startTime }</span>
                        </DetailContainer>

                        <Image src={ project.imageUrl }/>

                        {/*<span> { admin.email }</span>*/ }
                        {/*<span> { admin?.description }</span>*/ }
                        { project?.collaborators.map(user => (
                            <li key={ user.imageUrl } title={ user.username }>
                                <div>
                                    <img src={ user.imageUrl }/>
                                </div>
                            </li>
                        )) }

                    </ProjectListItem>
                )) }
            </UnsortedList>

        </PageContainer>
    )
}


/** Created by ownwindows on 18-01-22 **/
