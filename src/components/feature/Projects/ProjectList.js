////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
////////////////////
//// Environmental
import { AuthContext } from "../../../context/AuthProvider";
import { UtilityContext } from "../../../context/UtilityProvider";
import ProjectCreate from "./ProjectCreate";
import { Container, DetailRow } from "../../../styles/Layout";
import { getProjectsFor } from "../../../services/controllers/Projects";
import { CenteredSubHeader } from "../../../styles/Typography";
import { ProjectListItem, UnsortedList } from "../../../styles/List";
import { LinkHeader } from "../../../styles/Navigation";

/** Created by ownwindows on 18-01-22 **/


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
        <>
            { (loadedProjects && loadedProjects.length > 0) &&
                <Container>
                    <CenteredSubHeader>
                        Your Projects
                    </CenteredSubHeader>

                    <UnsortedList>
                        { loadedProjects && loadedProjects.map((project, index) => (
                            <ProjectListItem key={ index }>
                                <LinkHeader className="listItem" to={ `/projects/${ project.projectId }` }>

                                    { project.projectName }
                                </LinkHeader>

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

                    { writeProject &&
                        <ProjectCreate/>
                    }
                </Container>
            }
        </>


)
}
