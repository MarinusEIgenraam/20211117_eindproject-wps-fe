////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from "axios";
import { AiOutlineClose } from "react-icons/all";
////////////////////
//// Environmental
import { UtilityContext } from "../../context/UtilityProvider";
import { DetailContainer, H1, SubTitle } from "../shared/styling/Text";
import { PageContainer, PageHeader } from "../shared/styling/Layout";
import { UnorderedList } from "../shared/styling/List";
import { Image } from "../shared/styling/Images";
import RectangleButton from "../shared/elements/clickables/RectangleButton/RectangleButton";
import { AuthContext } from "../../context/AuthProvider";
import CreateProject from "../layout/forms/Project/CreateProject";
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
            console.log(response)
            setLoadedProjects(response.data.content);
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
        } else {
            return;
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
                <CreateProject/>
            }
            <UnorderedList>
                { loadedProjects && loadedProjects.map(project => (
                    <ProjectItem to={ `/project/${ project.id }` } key={ project.id }>
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

                    </ProjectItem>
                )) }
            </UnorderedList>

        </PageContainer>
    )
}

const ProjectItem = styled.li`
  width: 70vw;
  height: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: row;
  transition: all 500ms;
  padding: 1rem;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  //overflow: hidden;

  :not(:nth-child(1)) {
    margin-top: -130px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px -20px 20px -20px;

  }

  :hover {
    border: solid var(--box-border-medium) ${ props => props.theme.border };
    box-shadow: ${ props => props.theme.shadow };
    //margin: 25px 25px 50px 25px;
    background: ${ props => props.theme.windowBackground };
    margin-bottom: 150px;

  }

  @media (min-width: 769px) {

  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

`

/** Created by ownwindows on 18-01-22 **/
