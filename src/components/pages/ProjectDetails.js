////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import styled from 'styled-components';
////////////////////
//// Environmental
import { Column, CommentContainer, DetailRow, Divider, PageContainer } from "../../styles/Layout";
import { UtilityContext } from "../../context/UtilityProvider";
import { useParams } from "react-router-dom";
import { FormWindow } from "../../styles/Form";
import { Category, Collaborators, ListMetaData, ProjectHeader, } from "../../styles/TextLayout";
import { Image, Img, ProjectHero } from "../../styles/Images";
import { getProjectComments } from "../../services/controllers/Comments";
import { getOneProject } from "../../services/controllers/Projects";
import Comment from "../shared/elements/Comments/Comment";
import { Description, DetailContainer, Owner, User, Users, Votes } from "../../styles/Typography";
import { getTasksFor } from "../../services/controllers/Tasks";
import { ListItem, ProjectListItem } from "../../styles/List";
import { ProjectCardLink } from "../../styles/Navigation";
import ListComment from "../shared/elements/Comments/ListComment";



export default function Project({}) {
    const source = axios.CancelToken.source();
    const { setIsLoading, setHasError } = useContext(UtilityContext);
    const [ loadedProject, setLoadedProject ] = useState();
    const [ loadedComments, setLoadedComments ] = useState();
    const [ loadedTasks, setLoadedTasks ] = useState();

    const { id } = useParams();

    useEffect(() => {

        const getData = async () => {
            const projectResult = await getOneProject(setIsLoading, setHasError, id);
            setLoadedProject(projectResult.data);
            const commentResults = await getProjectComments(setIsLoading, setHasError, id);
            setLoadedComments(commentResults.data)
        }
        console.log(loadedComments)

        getData()

        return function clearData() {
            source.cancel();
        };

    }, []);

    return (
        <PageContainer>
            {loadedProject &&
            <>

                <FormWindow>
                    <ProjectHeader>
                        <Text>
                            <Title>

                                { loadedProject.projectName }

                            </Title>
                            <Collaborators>Collaborators: { loadedProject?.collaborators.map((user) =>
                                <span>{ user.username }</span>) }</Collaborators>

                            <Votes>{ loadedProject?.voteCount } vote{ loadedProject?.voteCount > 1 && `'s` } on this
                                project</Votes>
                            <Owner>Project owner: { loadedProject?.projectOwner.username }</Owner>
                            <Category>{ loadedProject?.category.name }</Category>
                        </Text>
                        <ProjectHero>
                            <Img src={ loadedProject?.url }/>
                        </ProjectHero>
                    </ProjectHeader>
                    <ListMetaData>
                        <Users>

                            <Divider/>
                            <Description>{ loadedProject?.description }</Description>
                            <Divider/>

                        </Users>
                    </ListMetaData>
                    { loadedProject?.projectTaskList &&
                       loadedProject?.projectTaskList.map((task, index) =>
                            (
                                <ListItem key={index}>
                                    { task.taskName } { task.taskOwner.username }
                                </ListItem> )
                        )
                    }

                </FormWindow>


                { loadedComments &&
                    loadedComments.map((comment, index) =>
                        (
                            <Comment comment={comment} key={ index }/>
                        )) }

            </>
            }
        </PageContainer>
    )
}


const Title = styled.h3`

`

const Text = styled.div`
  width: 50%;
`

/** Created by ownwindows on 04-01-22 **/
