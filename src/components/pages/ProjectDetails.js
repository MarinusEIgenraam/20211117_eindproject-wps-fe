////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from "axios";
////////////////////
//// Environmental
import { DetailRow, PageContainer } from "../../styles/Layout";
import { UtilityContext } from "../../context/UtilityProvider";
import { useParams } from "react-router-dom";
import { FormWindow } from "../../styles/Form";
import { Image } from "../../styles/Images";
import { getProjectComments } from "../../services/controllers/Comments";
import { getOneProject } from "../../services/controllers/Projects";
import Comment from "../shared/elements/Comments/Comment";
import {
    Category,
    Date,
    DetailContainer,
    Owner,
    PrimaryInfo,
    ProjectDescription,
    ProjectMain,
    SecondaryInfo,
    SubHeader,
    User,
    Votes
} from "../../styles/Typography";
import RectangleButton from "../shared/elements/clickables/RectangleButton";
import { Table, TableRow } from "../../styles/Table";
import { QUERIES } from "../../services/helpers/mediaQueries";


export default function Project({}) {
    const source = axios.CancelToken.source();
    const { setIsLoading, setHasError, creationCount, setCreationCount } = useContext(UtilityContext);
    const [ loadedProject, setLoadedProject ] = useState();
    const [ loadedComments, setLoadedComments ] = useState();
    const [ loadCount, setLoadCount ] = useState(6);

    const { id } = useParams();

    useEffect(() => {

        const getData = async () => {
            const projectResult = await getOneProject(setIsLoading, setHasError, id);
            setLoadedProject(projectResult.data);
            const commentResults = await getProjectComments(setIsLoading, setHasError, loadCount, id);
            setLoadedComments(commentResults.data.content)
        }

        getData()

        return function clearData() {
            source.cancel();
        };

    }, [ loadCount, creationCount ]);

    function handlePageable() {
        setLoadCount(loadCount + 6)
    }

    return (
        <PageContainer>
            { loadedProject &&
                <>

                    <FormWindow>
                        <ProjectMain>
                            <DetailContainer>
                                <Title>
                                    { loadedProject.projectName }
                                </Title>
                                <ProjectDescription>
                                    { loadedProject.description }
                                </ProjectDescription>
                            </DetailContainer>
                            <Image className="with-margin" src={ loadedProject.imageUrl }/>
                        </ProjectMain>
                        <DetailRow className="users">
                            <PrimaryInfo>
                                <Owner>Project owner: { loadedProject?.projectOwner.username }</Owner>
                                { loadedProject?.collaborators.map((user, index) => (
                                    <User className="on">{ user.username } </User>
                                )) }
                            </PrimaryInfo>
                            <SecondaryInfo>
                                <Votes>{ loadedProject?.voteCount } vote{ loadedProject?.voteCount > 1 && `'s` } on this
                                    project</Votes>
                                <Category>{ loadedProject?.category.name }</Category>
                                <Date>{ loadedProject?.startTime }</Date>
                            </SecondaryInfo>
                        </DetailRow>


                    </FormWindow>
                    <FormWindow className="project-details-tasks">
                        <SubHeader>
                            Project tasks
                        </SubHeader>
                        <Table>

                            <TableRow>
                                <th className="name">
                                    name
                                </th>
                                <th className="description">
                                    description
                                </th>
                                <th className="number">
                                    sub tasks
                                </th>
                                <th className="user">
                                    task owner
                                </th>
                                <th className="date">
                                    deadline
                                </th>
                                <th className="date">
                                    created at
                                </th>
                            </TableRow>

                            { loadedProject?.projectTaskList &&
                                loadedProject?.projectTaskList.map((task, index) =>
                                    (
                                        <TableRow className="project-task" key={ index }>
                                            <td>{ task.taskName }
                                            </td>
                                            <td>
                                                { task.description }
                                            </td>
                                            <td>{ task.taskTaskList.length }</td>
                                            <td>
                                                { task.taskOwner.username }
                                            </td>
                                            <td className="date">
                                                { task.endTime }
                                            </td>
                                            <td className="date">
                                                { task.startTime }
                                            </td>
                                        </TableRow> )
                                )
                            }
                        </Table>
                    </FormWindow>


                    <CommentList>

                        { loadedComments &&
                            loadedComments.map(comment =>
                                (
                                    <Comment comment={ comment }/>
                                ))
                        }
                        { (loadedComments && loadedComments.length > 0) &&
                            <RectangleButton onClick={ handlePageable } buttonSize="btn btn--medium"
                                             buttonStyle="btn--special--outline">
                                Load more
                            </RectangleButton>
                        }
                    </CommentList>

                </>
            }
        </PageContainer>
    )
}

const CommentList = styled.ol`
  // li:first-child {
    //   box-shadow: ${ props => props.theme.topShadow };
  // }
`
const Title = styled.h3`

`

const Text = styled.div`
  width: 50%;
`

/** Created by ownwindows on 04-01-22 **/
