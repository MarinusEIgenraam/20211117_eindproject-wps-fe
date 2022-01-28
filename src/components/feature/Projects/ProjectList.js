////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { AiOutlineClose } from "react-icons/all";
////////////////////
//// Environmental
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";
import ProjectCreate from "./ProjectCreate";
import RectangleButton from "../../shared/elements/clickables/RectangleButton";
import { Container, DetailRow } from "../../../styles/Layout";
import { NavLink } from "react-router-dom";
import { getProjectsFor } from "../../../services/controllers/Projects";
import { H2 } from "../../../styles/Typography";
import { ProjectListItem, UnsortedList } from "../../../styles/List";

export default function ProjectList() {
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);

    const [ writeProject, setWriteProject ] = useState(false);
    const [ categoryUri, setCategoryUri ] = useState('');
    const [ loadedProjects, setLoadedProjects ] = useState();
    const [ projectCategory, setProjectCategory ] = useState('');

    useEffect(() => {
        const source = axios.CancelToken.source();
        if (projectCategory) {
            setCategoryUri(`?categoryId=${ projectCategory }`)
        }

        const getData = async () => {
            const response = await getProjectsFor(setHasError, setIsLoading, categoryUri)
            {
                response && setLoadedProjects(response.data.content)
            }
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ projectCategory ]);

    return (
        <Container>
            <H2>
                Your Projects
            </H2>

            <UnsortedList>
                { loadedProjects && loadedProjects.map(project => (
                    <ProjectListItem key={ project.id }>
                        <NavLink to={ `/projects/${ project.projectId }` }><h6> { project.projectName } </h6></NavLink>

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
                <ProjectCreate/>
            }
        </Container>
    )
}


/** Created by ownwindows on 18-01-22 **/
