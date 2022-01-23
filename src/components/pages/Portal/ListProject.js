////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UtilityContext } from "../../../context/UtilityProvider";
import axios from "axios";
import { H2 } from "../../shared/styling/Text";
import { UnorderedList } from "../../shared/styling/List";
import RectangleButton from "../../shared/elements/clickables/RectangleButton/RectangleButton";
import { AiOutlineClose } from "react-icons/all";
import { AuthContext } from "../../../context/AuthProvider";
import CreateProject from "../../layout/forms/Project/CreateProject";
import { Container } from "../../shared/styling/Layout";
import { ProjectLink } from "../../shared/styling/Navigation";
import { NavLink } from "react-router-dom";

////////////////////
//// Environmental
const { REACT_APP_API_URL } = process.env;

////////////////////
//// External

export default function ListProject() {
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
            } catch (e) {
                console.error(e);
                setHasError(true);
            }
            setIsLoading(false)
        }

        getData()
        console.log(loadedProjects)

        return function clearData() {
            source.cancel();
        };

    }, [ pageOffset, projectCategory ]);

    const handleSearch = (event) => {
    }


    return (
        <Container>
            <H2>
                Your Projects
            </H2>

                <UnorderedList>
                { loadedProjects && loadedProjects.map(project => (
                    <ProjectListItem key={ project.id }>
                        <NavLink to={ `/project/${ project.id }` } ><h6> { project.projectName } </h6></NavLink>

                        <DetailRow>
                            <h6>{ project.startTime } <span className="light">| { project.category.name } | { project.projectOwner.username } </span>
                            </h6>
                            <h6>
                                open tasks: {project.projectTaskList.length}
                            </h6>
                        </DetailRow>



                    </ProjectListItem>
                )) }
            </UnorderedList>
            { ( user?.authorities === "Project lord" | "Project manager" && !writeProject ) ?
                <RectangleButton
                    type="button"
                    onClick={ () => setWriteProject(true) }
                    buttonSize="btn--medium"
                    buttonStyle="btn--special--solid"
                >
                    NEW
                </RectangleButton>
                :
                <AiOutlineClose onClick={ () => setWriteProject(false) } size={ 30 }/>

            }
            { writeProject &&
                <CreateProject/>
            }
        </Container>
    )
}




export const DetailRow = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.25rem 0;
  border-top: solid var(--box-border-medium) ${ props => props.theme.border };


  .light {
    font-weight: 300;
  }
`

const ProjectListItem = styled.li`
  width: 70vw;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  background: ${ props => props.theme.background };


  > h6{
    color: ${ props => props.theme.sub_text };
  }


  @media (min-width: 769px) {

  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

`

/** Created by ownwindows on 18-01-22 **/
