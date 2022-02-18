////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
////////////////////
//// Environmental
import { AuthContext } from "../../context/AuthProvider";
import { CenteredHeader } from "../../styles/Typography";
import { Divider, PageContainer } from "../../styles/Layout";
import ProjectList from "../feature/Projects/ProjectList";
import TaskList from "../feature/Tasks/TaskList";
import BlogList from "../feature/Blogs/BlogList";
import PortalUserDetails from "../feature/Portal/PortalUserDetails";
import { UtilityContext } from "../../context/UtilityProvider";
import { QUERIES } from "../../services/helpers/mediaQueries";
import { ButtonBox, ButtonWindow } from "../../styles/Form";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/all";
import BlogCreate from "../feature/Blogs/BlogCreate";
import ProjectCreate from "../feature/Projects/ProjectCreate";


export default function Portal() {
    const [ editCount, setEditCount ] = useState(0);
    const { user } = useContext(AuthContext);
    const [ writeProject, setWriteProject ] = useState(false);
    const [ writeBlog, setWriteBlog ] = useState(false);
    const { setHasError, setIsLoading, setCreationCount, creationCount } = useContext(UtilityContext);

    useEffect(() => {
    }, [ creationCount ]);

    return (
        <PageContainer>
            <CenteredHeader>
                Welcome back { user.username }
                <Divider className="small"/>
            </CenteredHeader>

            <PortalUserDetails/>
            <ButtonBox>
                { ( user?.authorities === "Project lord" | "Project manager" && !writeBlog ) &&
                    <RectangleButton
                        type="button"
                        onClick={ () => setWriteBlog(true) }
                        buttonSize="btn--large"
                        buttonStyle="btn--special--solid"
                        disabled={ writeProject }

                    >
                        blog<AiOutlinePlus size={ 15 }/>
                    </RectangleButton>

                }
                { ( user?.authorities === "Project lord" | "Project manager" && !writeProject ) &&
                    <RectangleButton
                        type="button"
                        onClick={ () => setWriteProject(true) }
                        buttonSize="btn--large"
                        buttonStyle="btn--secondary--solid"
                        disabled={ writeBlog }
                    >
                        project<AiOutlinePlus size={ 15 }/>
                    </RectangleButton>


                }
            </ButtonBox>
            { ( writeBlog || writeProject ) &&
                <ButtonWindow>
                    { writeBlog &&
                        <AiOutlineClose onClick={ () => setWriteBlog(false) } size={ 30 }/>
                    }
                    { writeProject &&
                        <AiOutlineClose onClick={ () => setWriteProject(false) } size={ 30 }/>
                    }
                </ButtonWindow>

            }

            { writeBlog &&
                <BlogCreate/>
            }
            { writeProject &&
                <ProjectCreate/>
            }

            <ListWindow>
                <BlogList/>
                <TaskList editCount={ editCount } setEditCount={ setEditCount }/>
                <ProjectList/>
            </ListWindow>
        </PageContainer>
    )
}

const ListWindow = styled.div`
  width: 70vw;
  grid-gap: 20px;
  display: grid;

  @media ${ QUERIES.tablet } {
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    max-width: 100%;
  }


`


/** Created by ownwindows on 04-01-22 **/

