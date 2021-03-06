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
import { HeaderBar, HeaderBox } from "../../../styles/Typography";
import { ProjectListItem, UnsortedList } from "../../../styles/List";
import { LinkHeader } from "../../../styles/Navigation";
import { AiOutlineFundProjectionScreen } from "react-icons/all";

/** Created by ownwindows on 18-01-22 **/


export default function ProjectList() {
    const utilityContext = useContext(UtilityContext);
    const { isAuth, user } = useContext(AuthContext);
    const [ pageable, setPageable ] = useState('');

    const [ writeProject, setWriteProject ] = useState(false);
    const [ loadedProjects, setLoadedProjects ] = useState();
    const [ projectCategory, setProjectCategory ] = useState();

    useEffect(() => {
        const source = axios.CancelToken.source();
        setPageable(`?collaborator=${ user.username }`)

        if (projectCategory) {
            setPageable(`${ pageable }&categoryId=${ projectCategory }`)
        }

        getProjectsFor(utilityContext, pageable).then((response) => setLoadedProjects(response.data.content))

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <>
            { ( loadedProjects && loadedProjects.length > 0 ) &&
                <Container>
                    <HeaderBar>
                        <h3>
                            Your projects
                        </h3>
                        <div>

                            { loadedProjects.length } <AiOutlineFundProjectionScreen size={ 20 }/>
                        </div>
                    </HeaderBar>


                    <UnsortedList>
                        { loadedProjects && loadedProjects.map((project, index) => (
                            <ProjectListItem key={ index }>
                                <HeaderBox>
                                    <LinkHeader className="listItem" to={ `/projects/${ project.projectId }` }>

                                        { project.projectName }
                                    </LinkHeader>
                                </HeaderBox>

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
