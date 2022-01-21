////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";
import axios from "axios";
import { DetailContainer, H1, H2, SubTitle } from "../../shared/styling/Text";
import { PageContainer, PageHeader } from "../../shared/styling/Layout";
import Logo from "../../../assets/images/home_background.png";
import { Ul, UnorderedList } from "../../shared/styling/List";
import { Image } from "../../shared/styling/Images";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import { AiOutlineClose } from "react-icons/all";
import CreateBlog from "../../layout/forms/Blog/CreateBlog";
import { AuthContext } from "../../../context/AuthProvider";
import CreateProject from "../../layout/forms/Project/CreateProject";

////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;

////////////////////
//// External

export default function ProjectOverview() {
    const [ pageOffset, setPageOffset ] = useState(0);
    const { setIsLoading } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ writeProject, setWriteProject ] = useState(false);
    const [ hasError, setHasError ] = useState(false);
    const [ categoryUri, setCategoryUri ] = useState('');

    const [ loadedProjects, setLoadedProjects ] = useState();
    const [ filteredProjects, setFilteredProjects ] = useState(loadedProjects);
    const [ searchParam, setSearchParam ] = useState([ "owner", "name" ])

    const [ isSelected, setIsSelected ] = useState({});
    const [ projectCategory, setProjectCategory ] = useState('');

    const API_URL = `${ REACT_APP_API_URL }projects`;


    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');
        if (projectCategory) {
            setCategoryUri(`?categoryId=${ projectCategory }`)
        }

        async function getData() {
            setHasError(false);
            setIsLoading(true)


            try {
                const result = await axios.get(`${ API_URL }${ categoryUri }`, {
                    cancelToken: source.token,
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                });

                setLoadedProjects(result.data.content);
                console.log(loadedProjects)
                console.log(result.data)
            } catch (e) {
                console.error(e);
                setHasError(true);
            }
            setIsLoading(false)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ pageOffset, projectCategory ]);

    const handleSearch = (event) => {
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
            { ( user?.authorities === "Project lord" | "Project manager" && !writeProject ) ?
                <RectangleButton
                    type="button"
                    onClick={ () => setWriteProject(true) }
                    buttonSize="btn--large"
                    buttonStyle="btn--danger--solid"
                >
                    NEW
                </RectangleButton>
                :
                <AiOutlineClose onClick={ () => setWriteProject(false) } size={ 30 }/>

            }
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
